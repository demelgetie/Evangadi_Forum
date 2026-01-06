import React, { useState, useContext } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Appstate } from "../App";
import api from "../axios/axios";
import Layout from "../components/Layout";

function AskQuestion() {
  const { user } = useContext(Appstate);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/question", {
        title: title.trim(),
        description: description.trim(),
      });

      setSuccess(true);
      const newQuestionId = data.question_id || data.id || data._id;
      setTimeout(() => {
        navigate(`/question/${newQuestionId}`);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container className="mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <Card className="shadow p-4">
              <h3 className="mb-4 text-center">
                Steps to write a good question
              </h3>
              <ul>
                <li>Summarize your problem in a one-line title.</li>
                <li>Describe your problem in more detail.</li>
                <li>
                  Describe what you tried and what you expected to happen.
                </li>
                <li>Review your question and post it to the site.</li>
              </ul>

              <hr />

              <h4 className="mb-4 text-center">Ask a public question</h4>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && (
                <Alert variant="success">Question posted! Redirecting...</Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                    size="lg"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Question Description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Posting..." : "Post Your Question"}
                  </Button>
                </div>
              </Form>
            </Card>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default AskQuestion;
