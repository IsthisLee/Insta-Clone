const express = require("express");
const router = express.Router();
const Users = require("../../models/users");
const Posts = require("../../models/posts");
const jwt = require("jsonwebtoken");
const secretKey = require("../../config").secretKey;
const expireToken = require("../../config").expiresIn;
const bcrypt = require("bcrypt");
const saltRounds = require("../../config").saltRounds;

const checkTokenInCookie = require("../middlewares/authUseCookie");

//회원가입(중복검사 + 규칙체크)
router.post("/userlist/register", async (req, res) => {
    try {
        const { userId, nickname, password, passwordCheck } = req.body;

        // 아이디: `알파벳 대소문자(a~z, A~Z), 숫자(0~9) 및 .뒤에는 2-3글자`로 구성
        let checkId = userId.search(
            /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/g
        );
        if (checkId === -1) {
            res.status(400).send({
                errorMessage: "입력하신 아이디가 이메일 형식에 맞지 않습니다.",
            });
            return;
        }

        // 아이디 중복검사
        const existUserId = await Users.findOne({
            $or: [{ userId }],
        });
        if (existUserId) {
            res.status(400).send({
                errorMessage: "중복된 아이디입니다.",
            });
            return;
        }

        // 닉네임 : `길이는 4~15, 알파벳 대소문자(a~z, A~Z), 숫자(0~9), 특수문자(-_)`로 구성
        let checkNickname = nickname.search(/^[A-za-z0-9_-]{4,15}$/g);
        if (checkNickname === -1) {
            // console.log("아이디 형식 체크를 스쳐지나간다")
            res.status(400).send({
                errorMessage: "아이디가 형식에 맞지 않습니다.",
            });
            return;
        }

        //닉네임 중복검사
        const existNickname = await Users.findOne({
            $or: [{ nickname }],
        });
        if (existNickname) {
            res.status(400).send({
                errorMessage: "중복된 닉네임입니다.",
            });
            return;
        }

        // 비밀번호는 `최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패`
        let checkPassword = password;
        checkIncludeId = userId.split("@")[0];
        if (password.length < 4 || checkPassword.includes(checkIncludeId)) {
            res.status(400).send({
                errorMessage:
                    "패스워드는 최소 4자 이상이며, 아이디와 같은 값은 포함될 수 없습니다.",
            });
            return;
        }

        //패스워드 불일치(패스워드 != 패스워드확인란)
        if (password !== passwordCheck) {
            res.status(400).send({
                errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
            });
            return;
        }
        var plainTextPassword = password;
        //비밀번호 해쉬처리
        const hash = bcrypt.hashSync(plainTextPassword, +saltRounds);

        //유저 등록
        const user = new Users({
            userId,
            nickname,
            password: hash,
        });
        await user.save();
        res.status(201).send({ result: "success" });
        return;
    } catch (error) {
        console.log(error);
        res.status(400).send({
            errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
        });
        return;
    }
});

//로그인

router.post("/userlist/login", async (req, res) => {
    try {
        const { userId, password } = req.body; // 로그인정보 받음
        const userFind = await Users.findOne({ userId });

        if (!userFind) {
            res.status(400).send({
                errorMessage: "아이디 또는 패스워드가 잘못되었습니다.",
            });
            return;
        }

        //비밀번호 비교 (입력값 vs 해싱비밀번호)
        const validPassword = await bcrypt.compareSync(
            password,
            userFind.password
        );

        if (!validPassword) {
            res.status(400).send({
                errorMessage: "아이디 또는 패스워드가 잘못되었습니다.",
            });
            return;
        }

        const token = jwt.sign(
            {
                userId: userFind.userId,
                nickname: userFind.nickname,
                userIdCnt: userFind.userIdCnt,
            },
            secretKey,
            {
                expiresIn: "24h", //Cookie에도 expire가 있어서 Token expire랑 이중으로 expire설정돼버림
            }
        ); //토큰생성
        console.log("토큰생성완료");
        // res.cookie("authCookie", token, { maxAge: 1800000, httpOnly: true });
        res.status(201).json({
            result: "success",
            token,
        });
    } catch (error) {
        res.status(400).send({
            errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
        });
    }
});

//유저 프로필 페이지
router.get(
    "/userProfile/:userId",
    checkTokenInCookie,
    async (req, res, next) => {
        try {
            const { userId } = req.params;
            const userPosts = await Posts.find({ userId }).sort("-postId");
            let arr = [];
            userPosts.forEach((i) => arr.push(i.imgUrl));
            console.log(`유저프로필페이지 : ${userPosts}, 게시 사진 : ${arr}`);
            res.json({ userPosts: userPosts, img: arr });
        } catch (error) {
            res.render(`유저 프로필 페이지 에러`);
        }
    }
);

router.get("/me", checkTokenInCookie, async (req, res) => {
    // 해당 경로로 들어오는 경우에만 authMiddleware 붙음
    let userId = res.locals.userId;
    let nickname = res.locals.nickname;
    let userIdCnt = res.locals.userIdCnt;

    res.send({ userId, nickname, userIdCnt });
});

module.exports = router;
