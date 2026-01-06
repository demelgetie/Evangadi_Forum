import React, { useContext, useEffect, useState } from "react";
import { Appstate } from "../App";
import Layout from "../components/Layout";
import api from "../axios/axios";
import { Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Home() {
  const { user } = useContext(Appstate);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getQuestions() {
      try {
        const { data } = await api.get("/question");
        setQuestions(data.questions || data || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    getQuestions();
  }, []);

  const handleQuestionClick = (id) => {
    navigate(`/question/${id}`);
  };

  return (
    <Layout>
      <Container className="mt-4">
        {/* Top Bar: Ask Question + Welcome */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/ask">
            <Button variant="primary">Ask Question</Button>
          </Link>
          <h6 className="mb-0">Welcome: {user?.username}</h6>
        </div>

        {/* Questions Title */}
        <h4 className="mb-4 border-bottom pb-2">Questions</h4>

        {/* Questions List */}
        <div className="d-flex flex-column gap-3">
          {questions.length === 0 ? (
            <p className="text-muted text-center">
              No questions yet. Be the first to ask!
            </p>
          ) : (
            questions.map((q) => (
              <div
                key={q.question_id || q.id}
                className="d-flex align-items-center border-bottom pb-3 cursor-pointer"
                onClick={() => handleQuestionClick(q.question_id || q.id)}
                style={{ cursor: "pointer" }}
              >
                {/* Avatar + Username */}
                <div className="text-center me-4">
                  <div
                    className="d-flex align-items-center justify-content-center mb-1"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#e9ecef",
                    }}
                  >
                    <PersonIcon fontSize="large" />
                  </div>
                  <small className="text-muted">
                    {q.username || "Anonymous"}
                  </small>
                </div>

                {/* Question Title */}
                <div className="flex-grow-1">
                  <h6 className="mb-0">{q.title}</h6>
                </div>

                {/* Right Arrow */}
                <ArrowForwardIosIcon className="text-muted" fontSize="small" />
              </div>
            ))
          )}
        </div>
      </Container>
    </Layout>
  );
}

export default Home;
