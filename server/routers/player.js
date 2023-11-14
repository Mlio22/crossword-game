const express = require("express");
const PlayerController = require("../controllers/playerController");
const { mustAuthenticated } = require("../middlewares/authentication");
const router = express.Router();

router.post("/login", PlayerController.login);
router.post("/signup", [mustAuthenticated], PlayerController.signup);
router.get("/games/:gameId", [mustAuthenticated], PlayerController.getSessionById);
router.get("/games/:gameId/:questionID", [mustAuthenticated], PlayerController.getQuestion);
router.post("/games/:gameId/:questionID", [mustAuthenticated], PlayerController.answerQuestion);

module.exports = router;
