require("dotenv").config();

const express = require("express");
const router = require("./routers");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

module.exports = app;
