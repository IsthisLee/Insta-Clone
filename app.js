const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Request-Method": "POST, GET, DELETE, PATCH, PUT",
    // "Access-Control-Request-Headers": "X-Custom-Header",
    credentials: true, // 크로스 도메인 허용 ,,Access-Control-Allow-Origin을 true로 만들어주는 옵션
};
app.use(cors(corsOptions));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const connect = require("./models");
connect();

const config = require("./config");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));

const index = require("./api/routes");
app.use("/api", index);

app.use("/get", (req, res) => {
    res.cookie("authCookie", "11111", { maxAge: 1800000, httpOnly: true });
    res.send("hello");
});
app.use("/put", (req, res) => {
    console.log(req.headers.cookie);
    res.send({ result: req.headers, cookies: req.cookies });
});

app.listen(config.port, () => {
    console.log(`listening at http://localhost:${config.port}`);
});
