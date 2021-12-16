const express = require("express");
const router = express.Router();
const Comments = require("../../models/comments");
const Posts = require("../../models/posts");

router
    .route("/postlist/:postId/commentlist")

    //댓글 불러오기 API
    .get(async (req, res) => {
        const { postId } = req.params;

        try {
            const postList = await Posts.findOne({ postId: postId });
            const commentList = await Comments.find({ postId: postId }).sort(
                "-commentId"
            );
            res.json({ postlist: postList, commentlist: commentList });
        } catch {
            res.status(400).json({
                errorMessage: "댓글 불러오는 중 오류 발생",
            });
        }
    })

    //댓글 작성 API
    .post(async (req, res) => {
        const { postId } = req.params;
        const { comment } = req.body;
        const userId = res.locals.userId,
            nickname = res.locals.nickname;

        try {
            const post = await Posts.findOne({ postId: postId });
            if (post)
                //게시글이 있을 경우에만
                //댓글 작성
                await Comments.create({ postId, comment, userId, nickname });
            //게시글 db의 댓글 Count값 변경
            const comments = await Comments.find({ postId: postId });
            post.commentCnt = comments.length;
            await post.save();
            return res.send();
        } catch {
            res.status(400).json({
                errorMessage: "댓글 작성 중 오류 발생",
            });
        }
    });

router
    .route("/postlist/:postId/commentlist/:commentId")

    //댓글 수정 API
    .put(async (req, res) => {
        const { postId, commentId } = req.params;
        const { comment } = req.body;
        const userId = res.locals.userId;

        try {
            //본인 댓글 여부
            const result = await Comments.findOne({ commentId: commentId });
            if (result.userId !== userId) {
                return res.status(412).json({
                    errorMessage: "본인 댓글만 수정 가능합니다.",
                });
            }
            //댓글 수정
            if (result.postId == postId) {
                await Comments.updateOne(
                    {
                        commentId: commentId,
                    },
                    {
                        $set: {
                            comment: comment,
                            updatedAt: Date(),
                        },
                    }
                );
                return res.send();
            }
            res.status(412).json({
                errorMessage: "일치하지 않는 게시글입니다.",
            });
        } catch {
            res.status(400).json({
                errorMessage: "댓글 수정 중 오류 발생",
            });
        }
    })

    //댓글 삭제 API
    .delete(async (req, res) => {
        const { postId, commentId } = req.params;
        const userId = res.locals.userId;

        try {
            //본인 댓글 여부
            const result = await Comments.findOne({ commentId: commentId });
            if (result.userId !== userId) {
                return res.status(412).json({
                    errorMessage: "본인 댓글만 수정 가능합니다.",
                });
            }
            //댓글 삭제
            await Comments.deleteOne({
                postId: postId,
                commentId: commentId,
            });
            //게시글 db의 댓글 count값 변경
            const comments = await Comments.find({ postId: postId });
            const post = await Posts.findOne({
                postId: postId,
            });
            post.commentCnt = comments.length;
            await post.save();
            return res.send();
        } catch {
            res.status(400).json({
                errorMessage: "댓글 삭제 중 오류 발생",
            });
        }
    });

module.exports = router;
