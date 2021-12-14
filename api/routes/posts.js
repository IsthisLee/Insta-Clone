const express = require("express");
const multer = require("multer");
const router = express.Router();
const Posts = require("../../models/posts");
//const Comments = require("../../models/comments");
const upload = require("../middlewares/multer");

router.post("/upload", async (req, res) => {
    //multer로 사진파일 업로드
    try {
        upload(req, res, (err) => {
            if (err) {
                return res.json({ success: false, err });
            }
            return res.json({ success: true, filePath: req.file.path });
        });
    } catch {
        res.status(400).json({
            errorMessage: "파일 업로드 오류 발생",
        });
    }
});

router
    .route("/postlist")

    //메인 페이지 요청 API
    .get(async (req, res) => {
        try {
            const postList = await Posts.find().sort("posrId");
            //const commentList = await Comments.find().sort("commentId");
            res.json({ postlist: postList, commentlist: "추가예정" });
        } catch {
            res.status(400).json({
                errorMessage: "메인페이지 데이터 요청 오류 발생",
            });
        }
    })

    //게시글 업로드 API
    .post(async (req, res) => {
        //사진 외 정보들 DB에 저장.(사진 경로 포함)
        try {
            const { userId, nickname, imgUrl, content } = req.body;
            await Posts.create({ userId, nickname, imgUrl, content });
            res.send();
        } catch {
            res.status(400).json({
                errorMessage: "게시글 업로드 오류 발생",
            });
        }
    });

router
    .route("/postlist/:postId")
    .put(async (req, res) => {})
    .delete(async (req, res) => {});

module.exports = router;
