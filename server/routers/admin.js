const express = require("express");
const AdminController = require("../controllers/adminController");

const router = express.Router();

router.post("/login", AdminController.login);
router.get("/games", AdminController.getGames);
router.post("/games", AdminController.createGame);
router.put("/games/:id", AdminController.updateGame);
router.delete("/games/:id", AdminController.deleteGame);
router.get("/games/:id", AdminController.getSession);
router.get("/games/:id/open", AdminController.openSession);
router.get("/games/:gameSessionId/start", AdminController.startSession);
router.get("/games/:gameSessionId/end", AdminController.endSession);
router.get("/games/:gameSessionId/result", AdminController.getResult);

module.exports = router;
