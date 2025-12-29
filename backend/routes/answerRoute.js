const express = require("express");
const { postAnswer, getAnswers } = require("../controllers/answerController");

const router = express.Router();

router.post("/answer", postAnswer);
router.get("/answer/:question_id", getAnswers);

module.exports = router;
