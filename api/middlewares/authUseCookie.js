const jwt = require("jsonwebtoken");
const secretKey = require("../../config/index").secretKey;
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        console.log("토큰+쿠키 미들웨어 들옴");
        const clientToken = req.cookies.authCookie;
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
