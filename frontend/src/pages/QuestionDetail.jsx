import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import Layout from "../components/Layout";
import api from "../axios/axios";
import AnswerCard from "../components/AnswerCard";
import { Appstate } from "../App";
import ReactMarkdown from "react-markdown";

// Gemini Sparkle Icon Component
const GeminiIcon = ({ size = 10, pulsing = false }) => (
  <div
    className={`d-inline-flex align-items-center justify-content-center rounded-circle bg-gradient ${
      pulsing ? "animate-pulse" : ""
    }`}
    style={{
      width: size,
      height: size,
      background: "linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)",
      boxShadow: "0 4px 20px rgba(66, 133, 244, 0.4)",
    }}
  >
    <svg
      width={size * 0.6}
      height={size * 0.6}
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  </div>
);

function QuestionDetail() {
  const { id } = useParams();
  const { user } = useContext(Appstate);

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [aiAnswer, setAiAnswer] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const fetchQuestion = async () => {
    try {
      const { data } = await api.get(`/question/${id}`);
      setQuestion(data);
    } catch (err) {
      setError("Failed to load question.");
    }
  };

  const fetchAnswers = async () => {
    try {
      const { data } = await api.get(`/answer/${id}`);
      setAnswers(data);
    } catch (err) {
      console.error("Failed to load answers:", err);
    }
  };

  const generateAiAnswer = async () => {
    if (!question) return;

    setAiLoading(true);
    setError("");

    try {
      const { data } = await api.post("/gemini-answer", {
        question_title: question.title,
        question_description: question.description || question.desc || "",
      });
      setAiAnswer(data.ai_answer);
    } catch (err) {
      console.error("Gemini failed:", err);
      setAiAnswer(null);
      setError("AI answer unavailable.");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      await Promise.all([fetchQuestion(), fetchAnswers()]);
      setLoading(false);
    }
    loadData();
  }, [id]);

  useEffect(() => {
    if (question && !aiAnswer) {
      generateAiAnswer();
    }
  }, [question]);

  const handlePostAnswer = async (e) => {
    e.preventDefault();
    if (!answerText.trim()) return;

    setPosting(true);
    try {
      const { data } = await api.post("/answer", {
        question_id: id,
        answer: answerText.trim(),
      });
      setAnswers([...answers, data.newAnswer || data.answer || data]);
      setAnswerText("");
    } catch (err) {
      setError("Failed to post answer.");
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container className="text-center mt-5">
          <Spinner animation="border" />
        </Container>
      </Layout>
    );
  }

  if (!question) {
    return (
      <Layout>
        <Container className="mt-5 text-center">
          <p>Question not found.</p>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="mt-4">
        {/* Question */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h3>Question</h3>
            <h4>{question.title}</h4>

            {/* FIXED: Show full name or username */}
            <p className="text-muted mb-3">
              Asked by:{" "}
              <strong>
                {question.first_name || question.last_name
                  ? `${question.first_name || ""} ${
                      question.last_name || ""
                    }`.trim()
                  : question.username || "Anonymous"}
              </strong>
            </p>

            <hr />
            <p>{question.description || "No description provided."}</p>
          </Card.Body>
        </Card>

        {/* AI Answer Section - Clean with Icon */}
        <Card
          className="mb-4 shadow position-relative overflow-hidden"
          style={{ borderRadius: "16px" }}
        >
          {/* Regenerate Button - Floating Top Right */}
          <div className="position-absolute top-0 end-0 p-3 z-3">
            <Button
              variant="light"
              size="sm"
              onClick={generateAiAnswer}
              disabled={aiLoading}
              className="shadow-sm rounded-pill"
            >
              {aiLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Generating...
                </>
              ) : (
                "⟳ Regenerate"
              )}
            </Button>
          </div>

          <Card.Body className="pt-5">
            <div className="text-center mb-4">
              <GeminiIcon size={70} pulsing={aiLoading && !aiAnswer} />
              <h5 className="mt-3 text-primary fw-semibold">
                Answer by Gemini AI
              </h5>
            </div>

            {aiLoading && !aiAnswer ? (
              <div className="text-center py-5">
                <GeminiIcon size={60} pulsing={true} />
                <p className="text-muted mt-3">Thinking...</p>
              </div>
            ) : aiAnswer ? (
              <div className="mx-auto" style={{ maxWidth: "800px" }}>
                <ReactMarkdown className="markdown-body">
                  {aiAnswer}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-center text-muted">
                AI answer unavailable. Click regenerate to try again.
              </p>
            )}
          </Card.Body>
        </Card>

        {/* Community Answers */}
        <h4 className="mb-3">Community Answers ({answers.length})</h4>

        {answers.length === 0 ? (
          <p className="text-muted text-center py-4">
            No answers yet. Be the first to help!
          </p>
        ) : (
          answers.map((ans, i) => (
            <AnswerCard
              key={ans.answer_id || i}
              username={ans.username || "Anonymous"}
              answer={ans.answer || ans.text}
            />
          ))
        )}

        {/* User Answer Form */}
        <Card className="mt-5 shadow-sm">
          <Card.Body>
            <h5>Add Your Answer</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handlePostAnswer}>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="6"
                  placeholder="Write your answer here..."
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  disabled={posting}
                  required
                />
              </div>
              <Button type="submit" variant="primary" disabled={posting}>
                {posting ? "Posting..." : "Post Your Answer"}
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}

export default QuestionDetail;
