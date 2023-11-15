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
router.put("/games/:id", [mustAdmin], AdminController.updateGame);
router.delete("/games/:id", [mustAdmin], AdminController.deleteGame);
router.get("/games/:id", [mustAdmin], AdminController.getSession);
router.get("/games/:id/open", [mustAdmin], AdminController.openSession);
router.get("/games/:gameSessionId/start", [mustAdmin], AdminController.startSession);
router.get("/games/:gameSessionId/end", [mustAdmin], AdminController.endSession);
router.get("/games/:gameSessionId/result", [mustAdmin], AdminController.getResult);

module.exports = router;
