const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose); // postId sequence 처리

const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    postId: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
        default: Date(),
    },
    updatedAt: {
        type: String,
    },
});

commentSchema.plugin(AutoIncrement, { inc_field: "commentId" });

module.exports = mongoose.model("Comment", commentSchema);
