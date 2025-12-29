const db = require("../config/db");
const { StatusCodes } = require("http-status-codes");

// POST QUESTION
async function postQuestion(req, res) {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const user_id = req.user.user_id;

    if (!title || !description) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Title and description required" });
    }

    const sql =
      "INSERT INTO questionTable (user_id, title, description) VALUES (?, ?, ?)";

    await db.execute(sql, [user_id, title, description]);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Question posted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error posting question" });
  }
}

// GET ALL QUESTIONS
async function getAllQuestions(req, res) {
  try {
    const sql =
      "SELECT q.*, u.username FROM questionTable q JOIN userTable u ON q.user_id = u.user_id ORDER BY q.created_at DESC";

    const [rows] = await db.execute(sql);

    res.status(StatusCodes.OK).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching questions" });
  }
}

// GET SINGLE QUESTION
async function getSingleQuestion(req, res) {
  try {
    const question_id = req.params.question_id;

    const sql =
      "SELECT q.*, u.username FROM questionTable q JOIN userTable u ON q.user_id = u.user_id WHERE q.question_id = ?";

    const [rows] = await db.execute(sql, [question_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching question" });
  }
}

module.exports = { postQuestion, getAllQuestions, getSingleQuestion };
