const jwt = require("jsonwebtoken");
const secretKey = require("../../config/index").secretKey;
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        console.log("토큰+쿠키 미들웨어 들옴");
        //header로 받아서(프론트용)
        const clientToken = await req.headers["authorization"];
        console.log("req.headers: ", req.headers);
        console.log("clientToken: ", clientToken);
        //const { authorization } = req.headers;

        //쿠키를 쏴줄 때(포스트맨)
        //const clientToken = req.cookies.authCookie;

        const decoded = jwt.verify(clientToken, secretKey);
        if (decoded) {
            res.locals.userId = decoded.userId;
            res.locals.nickname = decoded.nickname;
            res.locals.userIdCnt = decoded.userIdCnt;
            next();
        } else {
            res.status(401).json({ error: "unauthorized" });
        }
    } catch (err) {
        res.status(401).json({ error: "token expired" });
    }
};
