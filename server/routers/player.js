const express = require("express");
const PlayerController = require("../controllers/playerController");
const { mustAuthenticated } = require("../middlewares/authentication");
const router = express.Router();

router.post("/login", PlayerController.login);
router.post("/signup", [mustAuthenticated], PlayerController.signup);
router.get("/gameSession/:gameSessionId", [mustAuthenticated], PlayerController.getSessionById);
router.get("/gameSession/:gameSessionId/:sessionQuestionID", [mustAuthenticated], PlayerController.getQuestion);
router.post("/gameSession/:gameSessionId/:sessionQuestionID", [mustAuthenticated], PlayerController.answerQuestion);

module.exports = router;
