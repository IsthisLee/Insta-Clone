module.exports = {
  secretKey: "hanghae-insta", // 원하는 시크릿 키
  option: {
    algorithm: "HS256", // 해싱 알고리즘
    expiresIn: "24h", // 토큰 유효 기간
    issuer: "issuer", // 발행자
  },
};
