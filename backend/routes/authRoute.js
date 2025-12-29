const express = require("express");
const { register, login, checkUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check", authMiddleware, checkUser);

module.exports = router;
