import { useState } from "react";
import api from "../services/api";

function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/question", { title, description });
    window.location.href = "/";
  };

  return (
    <form onSubmit={submit}>
      <h2>Ask a Question</h2>
      <input
        placeholder="Question title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Question description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button>Post Question</button>
    </form>
  );
}

export default AskQuestion;
