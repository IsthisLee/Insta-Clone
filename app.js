const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Request-Method": "POST, GET, DELETE, PATCH, PUT",
    "Access-Control-Request-Headers": "X-Custom-Header",
    credentials: true,
};
app.use(cors());

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

app.listen(config.port, () => {
    console.log(`listening at http://localhost:${config.port}`);
});
