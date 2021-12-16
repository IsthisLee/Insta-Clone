const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    port: process.env.PORT,

    secretKey: process.env.secretKey, // 원하는 시크릿 키
    algorithm: process.env.algorithm, // 해싱 알고리즘
    expiresIn: process.env.expiresIn, // 토큰 유효 기간
    issuer: process.env.issuer, // 발행자
};
