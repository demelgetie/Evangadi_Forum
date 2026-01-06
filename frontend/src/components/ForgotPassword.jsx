import React, { useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../axios/axios";

function ForgotPassword() {
  const email = useRef();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const { data } = await api.post("/forgot-password", {
        email: email.current.value,
      });
      setSuccess(data.msg || "Reset link sent to your email");
    } catch (err) {
      setError(err?.response?.data?.msg || "Something went wrong");
    }
  }

 return (
   <Container
     fluid
     className="d-flex align-items-center justify-content-center"
   >
     <Row className="w-100 justify-content-center">
       <Col
         xs={11}
         sm={9}
         md={7}
         lg={5}
         xl={4}
         className="d-flex justify-content-center"
       >
         <Card
           className="shadow border-0 p-4 w-100"
           style={{ maxWidth: "420px" }}
         >
           <h3 className="text-center mb-4">Reset Your Password</h3>

           {success && <Alert variant="success">{success}</Alert>}
           {error && <Alert variant="danger">{error}</Alert>}

           <Form onSubmit={handleSubmit}>
             <Form.Group className="mb-3">
               <Form.Label>Email</Form.Label>
               <Form.Control
                 ref={email}
                 type="email"
                 placeholder="Enter your Email Address"
                 required
               />
             </Form.Group>

             <Button
               type="submit"
               className="w-100 py-2"
               style={{ backgroundColor: "#f6a54c", border: "none" }}
             >
               Reset
             </Button>
           </Form>

           <div className="text-center mt-3">
             <small>
               Already have an account?{" "}
               <Link to="/login" className="text-warning">
                 Log in
               </Link>
             </small>
           </div>

           <div className="text-center mt-1">
             <small>
               Don’t have an account?{" "}
               <Link to="/register" className="text-warning">
                 Sign Up
               </Link>
             </small>
           </div>
         </Card>
       </Col>
     </Row>
   </Container>
 );

}

export default ForgotPassword;
