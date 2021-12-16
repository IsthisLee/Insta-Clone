const mongoose = require("mongoose");

const AutoIncrement = require("mongoose-sequence")(mongoose); // userId sequence 처리

const { Schema } = mongoose;

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
});

userSchema.plugin(AutoIncrement, { inc_field: "userIdCnt" });

module.exports = mongoose.model("Users", userSchema);
