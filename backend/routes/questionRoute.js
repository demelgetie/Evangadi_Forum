const express = require("express");
const {
  postQuestion,
  getAllQuestions,
  getSingleQuestion,
} = require("../controllers/questionController");

const router = express.Router();

router.post("/question", postQuestion);
router.get("/question", getAllQuestions);
router.get("/question/:question_id", getSingleQuestion);

module.exports = router;
