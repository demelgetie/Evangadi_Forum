const express = require("express");
const app = express();
const authMiddleware = require("./middleware/authMiddleware");
const cors = require("cors");
app.use(cors());

const db = require("./config/db");
const authRoute = require("./routes/authRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");

app.use(express.json());

app.use("/api", authRoute);
app.use("/api", authMiddleware, questionRoute);
app.use("/api", authMiddleware, answerRoute);

// POST /api/gemini-answer
app.post("/api/gemini-answer", async (req, res) => {
  const { question_title, question_description } = req.body;

  // Debug: Log what you receive
  console.log("Gemini request received:", req.body);

  if (!question_title || !question_description) {
    return res
      .status(400)
      .json({ error: "Missing question_title or question_description" });
  }

  try {
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert answering technical questions clearly and accurately.

Question Title: ${question_title}
Question Description: ${question_description}

Provide a helpful, detailed answer in Markdown format.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ ai_answer: text });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: "Failed to generate AI answer" });
  }
});
const PORT = 5000;

async function start() {
  try {
    await db.execute("SELECT 1");
    app.listen(PORT, function () {
      console.log("✅ Database connected successfully");
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
}

start();
