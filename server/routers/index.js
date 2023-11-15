const express = require("express");
const { errorHandler } = require("../middlewares/errorHandler");
const router = express.Router();

router.use("/", require("./player"));
router.use("/admin", require("./admin"));

router.use(errorHandler);

module.exports = router;
