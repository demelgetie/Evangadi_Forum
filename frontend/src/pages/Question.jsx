import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Question() {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    api.get(`/question/${id}`).then((res) => setQuestion(res.data));
    api.get(`/answer/${id}`).then((res) => setAnswers(res.data));
  }, [id]);

  const submit = async () => {
    await api.post("/answer", { question_id: id, answer });
    setAnswer("");
    api.get(`/answer/${id}`).then((res) => setAnswers(res.data));
  };

  return (
    <div>
      <h2>{question.title}</h2>
      <p>{question.description}</p>

      <h3>Answers</h3>
      {answers.map((a) => (
        <div key={a.answer_id}>
          <p>{a.answer}</p>
          <small>— {a.username}</small>
        </div>
      ))}

      <textarea
        placeholder="Write your answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={submit}>Post Answer</button>
    </div>
  );
}

export default Question;
