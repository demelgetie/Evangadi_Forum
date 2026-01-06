import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function QuestionCard({ question_id, title, username }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/question/${question_id}`);
  };

  return (
    <Card
      className="mb-3 shadow-sm clickable-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div className="d-flex flex-column align-items-center me-4">
          <div
            className="d-flex align-items-center justify-content-center mb-1"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              backgroundColor: "#e9ecef",
            }}
          >
            <PersonIcon />
          </div>
          <small className="text-muted">{username}</small>
        </div>
        <div className="flex-grow-1">
          <h6 className="mb-0">{title}</h6>
        </div>
        <ArrowForwardIosIcon className="text-muted ms-3" />
      </Card.Body>
    </Card>
  );
}

export default QuestionCard;
