const express = require("express");
const app = express();

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
