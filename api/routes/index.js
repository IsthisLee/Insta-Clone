const express = require("express");
const router = express.Router();

const users = require("./users");
const posts = require("./posts");
const comments = require("./comments");

router.use("/", users);
router.use("/", comments);
router.use("/", posts);

module.exports = router;
