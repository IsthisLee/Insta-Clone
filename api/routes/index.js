const express = require("express");
const router = express.Router();

const users = require("./users");
const posts = require("./posts");
const comments = require("./comments");
const authCookie = require("../middlewares/authUseCookie");

router.use("/", users);
router.use("/", authCookie, comments);
router.use("/", authCookie, posts);

module.exports = router;
