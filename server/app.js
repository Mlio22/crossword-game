const express = require("express");
const router = require("./routers");
const app = express();

app.use(router);

module.exports = app;
