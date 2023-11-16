const express = require("express");
const PlayerController = require("../controllers/playerController");
const { mustAuthenticated, mustRegistered } = require("../middlewares/authentication");
const router = express.Router();

router.post("/login", PlayerController.login);
router.get("/checkSession/:gameSessionId", PlayerController.checkSession)
router.post("/signup", [mustAuthenticated], PlayerController.signup);

router.get("/gameSession/:gameSessionId", [mustAuthenticated, mustRegistered], PlayerController.getSessionById);

router.get("/gameSession/:gameSessionId/result", [mustAuthenticated, mustRegistered], PlayerController.getResult);

router.get("/gameSession/:gameSessionId/:sessionQuestionId", [mustAuthenticated, mustRegistered], PlayerController.getQuestion);
router.post("/gameSession/:gameSessionId/:sessionQuestionId", [mustAuthenticated, mustRegistered], PlayerController.answerQuestion);

module.exports = router;
