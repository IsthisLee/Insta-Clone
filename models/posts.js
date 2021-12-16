const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose); // postId sequence 처리

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    content: {
        type: String,

    },
    likePerson: {
        type: Array,
        default: [],
    },
    likeCnt: {
        type: Number,
        required: true,
        default: 0,
    },
    commentCnt: {
        type: Number,
        required: true,
        default: 0,
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

postSchema.plugin(AutoIncrement, { inc_field: "postId" });

module.exports = mongoose.model("Post", postSchema);
