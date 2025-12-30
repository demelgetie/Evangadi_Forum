import { Link } from "react-router-dom";

function QuestionCard({ q }) {
  return (
    <div>
      <h3>{q.title}</h3>
      <p>Asked by: {q.username}</p>
      <Link to={`/question/${q.question_id}`}>View</Link>
    </div>
  );
}

export default QuestionCard;
