import React, { useRef } from "react";
import api from "../axios/axios";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

function Register() {
  const username = useRef();
  const first_name = useRef();
  const last_name = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !username.current.value ||
      !first_name.current.value ||
      !last_name.current.value ||
      !email.current.value ||
      !password.current.value
    ) {
      alert("All fields required");
      return;
    }

    try {
      await api.post("/register", {
        username: username.current.value,
        first_name: first_name.current.value,
        last_name: last_name.current.value,
        email: email.current.value,
        password: password.current.value,
      });

      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="text-center">Join the Network</h4>

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control ref={username} />
      </Form.Group>

      <Row>
        <Col>
          <Form.Control ref={first_name} placeholder="First name" />
        </Col>
        <Col>
          <Form.Control ref={last_name} placeholder="Last name" />
        </Col>
      </Row>

      <Form.Group className="mb-3 mt-3">
        <Form.Label>Email</Form.Label>
        <Form.Control ref={email} />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Password</Form.Label>
        <Form.Control ref={password} type="password" />
      </Form.Group>

      <Button className="w-100" type="submit">
        Register
      </Button>

      <p className="text-center mt-3">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </Form>
  );
}

export default Register;
