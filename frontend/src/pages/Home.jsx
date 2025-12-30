import { useEffect, useState } from "react";
import api from "../services/api";
import QuestionCard from "../components/QuestionCard";

function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    api.get("/question").then((res) => setQuestions(res.data));
  }, []);

  return (
    <div>
      {questions.map((q) => (
        <QuestionCard key={q.question_id} q={q} />
      ))}
    </div>
  );
}

export default Home;
