const express = require("express");
const multer = require("multer");
const router = express.Router();
const Posts = require("../../models/posts");
const Comments = require("../../models/comments");
const upload = require("../middlewares/multer");

router
    .route("/postlist")

    //메인 페이지 요청 API
    .get(async (req, res) => {
        try {
            const postList = await Posts.find().sort("-postId");
            const commentList = await Comments.find().sort("commentId");

            res.json({ postlist: postList, commentlist: commentList });
        } catch {
            res.status(400).json({
                errorMessage: "메인페이지 데이터 요청 오류 발생",
            });
        }
    })

    //게시글 업로드 API
    .post(async (req, res) => {
        const userId = "rjsgmldnwn@gmail.com";

        upload(req, res, async (err) => {
            const { nickname, content } = req.body;

            try {
                const imgUrl = req.file.path;

                if (err) {
                    return res.json({ success: false, err });
                }
                await Posts.create({ userId, nickname, imgUrl, content });
                res.send();
            } catch {
                res.status(400).json({
                    errorMessage: "게시글 업로드 오류 발생",
                });
            }
        });
    });

router
    .route("/postlist/:postId")

    //게시글 수정 API
    .put(async (req, res) => {
        const { postId } = req.params;
        const post = await Posts.findOne({ postId: postId });
        const userId = "rjsgmldnwn@gmail.com";

        if (post.userId !== userId) {
            return res.status(412).json({
                errorMessage: "본인 게시글만 수정 가능합니다.",
            });
        }

        upload(req, res, async (err) => {
            const { content } = req.body;
            let imgUrl;

            if (req.file) {
                imgUrl = req.file.path;
            } else imgUrl = post.imgUrl;

            try {
                if (err) {
                    return res.json({ success: false, err });
                }
                await Posts.updateOne(
                    { postId: postId },
                    {
                        $set: {
                            content: content,
                            imgUrl: imgUrl,
                            updatedAt: Date(),
                        },
                    }
                );
                res.send();
            } catch {
                res.status(400).json({
                    errorMessage: "게시글 수정 중 오류 발생",
                });
            }
        });
    })

    //게시글 삭제 API
    .delete(async (req, res) => {
        const { postId } = req.params;
        const userId = "rjsgmldnwn@gmail.com";

        try {
            const post = await Posts.findOne({ postId: postId });

            if (post.userId !== userId) {
                return res.status(412).json({
                    errorMessage: "본인 게시글만 삭제 가능합니다.",
                });
            }
            await Posts.deleteOne({ postId: postId });
            res.send();
        } catch {
            res.status(400).json({
                errorMessage: "게시글 삭제 중 오류 발생",
            });
        }
    });

router.patch("/like/postlist/:postId", async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
        const post = await Posts.findOne({ postId: postId });
        const check = post.likePerson.filter((id) => id === userId);

        if (check[0]) {
            const change = post.likePerson.filter((id) => id !== userId);
            post.likePerson = change;
            post.likeCnt--;
            await post.save();
            return res.send("좋아요 취소");
        }
        post.likePerson.push(userId);
        post.likeCnt++;
        await post.save();
        return res.send("좋아요 추가");
    } catch {
        res.status(400).json({
            errorMessage: "좋아요 오류 발생",
        });
    }
});

// router.post("/like/postlist/:postId", async (req, res) => {
//     const { postId } = req.params;
//     const { userId } = req.body;

//     try {
//         const post = await Posts.findOne({ postId: postId });
//         let check = false;
//         post.likePerson.forEach((userId0) => {
//             if (userId0 === userId) return (check = true);
//         });
//         if (!check) {
//             post.likePerson.push(userId);
//             post.save();
//             return res.send("좋아요 성공");
//         }
//         return res.send("이미 좋아요를 하였습니다.");
//     } catch {
//         res.status(400).json({
//             errorMessage: "좋아요 오류 발생",
//         });
//     }
// });

//초안. 파일 업로드 API 따로 구성하기. => 게시글 API에 하나로 합쳐버림

// router.post("/upload", async (req, res) => {
//     //multer로 사진파일 업로드
//     try {
//         upload(req, res, (err) => {
//             if (err) {
//                 return res.json({ success: false, err });
//             }
//             return res.json({
//                 success: true,
//                 filePath: req.file.path,
//                 body: req.body,
//                 file: req.file,
//             });
//         });
//     } catch {
//         res.status(400).json({
//             errorMessage: "파일 업로드 오류 발생",
//         });
//     }
// });

module.exports = router;
