const express = require("express");
const AdminController = require("../controllers/adminController");
const { mustAdmin } = require("../middlewares/authentication");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post("/login", AdminController.login);
router.get("/games", [mustAdmin], AdminController.getGames);
router.post("/games", [mustAdmin], upload.array('gameFiles'), AdminController.createGame);
router.put("/games/:id", [mustAdmin], upload.single('gameFile'), AdminController.updateGame);
router.delete("/games/:id", [mustAdmin], AdminController.deleteGame);
router.get("/games/:id/open", [mustAdmin], AdminController.openSession);
router.get("/gameSession/:gameSessionId/", [mustAdmin], AdminController.getSession);
router.get("/gameSession/:gameSessionId/start", [mustAdmin], AdminController.startSession);
router.get("/gameSession/:gameSessionId/end", [mustAdmin], AdminController.endSession);
router.get("/gameSession/:gameSessionId/result", [mustAdmin], AdminController.getResult);

module.exports = router;
