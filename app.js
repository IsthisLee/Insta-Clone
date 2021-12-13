const express = require("express");
const app = express();

const connect = require("./models");
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const config = require("./config");

const index = require("./api/routes");
app.use("/api", index);

app.listen(config.port, () => {
    console.log(`listening at http://localhost:${config.port}`);
});
