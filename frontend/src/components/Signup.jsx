import { useState } from "react";
import api from "../services/api";

function Signup() {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/register", form);
    alert("Registered successfully");
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="First Name"
        onChange={(e) => setForm({ ...form, first_name: e.target.value })}
      />
      <input
        placeholder="Last Name"
        onChange={(e) => setForm({ ...form, last_name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button>Sign Up</button>
    </form>
  );
}

export default Signup;
