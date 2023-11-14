const express = require("express");
const router = express.Router();

router.use("/", require("./player"));
router.use("admin", require("./admin"));

module.exports = router;
