const express = require("express");
const PlayerController = require("../controllers/playerController");
const router = express.Router();

router.post("/login", PlayerController.login);
router.post("/signup", PlayerController.signup);
router.get("/games/:gameId", PlayerController.getSessionById);
router.get("/games/:gameId/:questionID", PlayerController.getQuestion);
router.post("/games/:gameId/:questionID", PlayerController.answerQuestion);

module.exports = router;
