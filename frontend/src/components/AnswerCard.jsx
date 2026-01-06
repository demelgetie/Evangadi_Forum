import React from "react";
import { Card } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";

function AnswerCard({ username, answer }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-start">
          <div
            className="me-3 flex-shrink-0"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              backgroundColor: "#e9ecef",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon />
          </div>
          <div>
            <strong>{username}</strong>
            <p className="mt-2 mb-0">{answer}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AnswerCard;
