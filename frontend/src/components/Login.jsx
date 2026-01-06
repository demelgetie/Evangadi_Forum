// // import React, { useRef } from "react";
// // import api from "../axios/axios";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Form, Button } from "react-bootstrap";

// // function Login() {
// //   const email = useRef();
// //   const password = useRef();
// //   const navigate = useNavigate();

// //   async function handleSubmit(e) {
// //     e.preventDefault();

// //     const emailValue = email.current.value;
// //     const passwordValue = password.current.value;

// //     if (!emailValue || !passwordValue) {
// //       alert("All fields are required");
// //       return;
// //     }

// //     try {
// //       const { data } = await api.post("/login", {
// //         email: emailValue,
// //         password: passwordValue,
// //       });

// //       localStorage.setItem("token", data.token);
// //       navigate("/home");
// //     } catch (error) {
// //       alert(error?.response?.data?.msg || "Login failed");
// //     }
// //   }

// //   return (
// //     <Form onSubmit={handleSubmit}>
// //       <h4 className="text-center">Log into your account</h4>

// //       <Form.Group className="mb-3">
// //         <Form.Label>Email</Form.Label>
// //         <Form.Control ref={email} type="email" />
// //       </Form.Group>

// //       <Form.Group className="mb-4">
// //         <Form.Label>Password</Form.Label>
// //         <Form.Control ref={password} type="password" />
// //       </Form.Group>

// //       <Button type="submit" className="w-100">
// //         Login
// //       </Button>

// //       <p className="text-center mt-3">
// //         No account? <Link to="/register">Register</Link>
// //       </p>
// //     </Form>
// //   );
// // }

// // export default Login;

import React, { useRef, useState } from "react";
import api from "../axios/axios";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";

function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    if (!emailValue || !passwordValue) {
      alert("All fields are required");
      return;
    }

    try {
      const { data } = await api.post("/login", {
        email: emailValue,
        password: passwordValue,
      });

      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      alert(error?.response?.data?.msg || "Login failed");
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="text-center mb-4">Log into your account</h4>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control ref={email} type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Password</Form.Label>

        <InputGroup>
          <Form.Control
            ref={password}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </Button>
        </InputGroup>
      </Form.Group>

      <div className="text-end mb-3">
        <Link to="/forgot-password">Forgot password?</Link>
      </div>

      <Button type="submit" className="w-100">
        Login
      </Button>

      <p className="text-center mt-3">
        No account? <Link to="/register">Register</Link>
      </p>
    </Form>
  );
}

export default Login;

// import React, { useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Eye, EyeSlash } from "react-bootstrap-icons";
// import api from "../axios/axios";
// import "./Login.css";

// function Login() {
//   const email = useRef(null);
//   const password = useRef(null);
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const emailValue = email.current.value;
//     const passwordValue = password.current.value;

//     if (!emailValue || !passwordValue) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       const { data } = await api.post("/login", {
//         email: emailValue,
//         password: passwordValue,
//       });

//       localStorage.setItem("token", data.token);
//       navigate("/home");
//     } catch (error) {
//       alert(error?.response?.data?.msg || "Login failed");
//     }
//   }

//   return (
//     <div className="login-container text-center">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h4 className="login-title">Login to your account</h4>

//         {/* Email */}
//         <div className="form-group">
//           <label>Email</label>
//           <input ref={email} type="email" placeholder="xyz@gmail.com" />
//         </div>

//         {/* Password */}
//         <div className="form-group">
//           <label>Password</label>
//           <div className="password-wrapper">
//             <input
//               ref={password}
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter password"
//             />{" "}
//             <button
//               type="button"
//               className="eye-btn"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeSlash /> : <Eye />}
//             </button>
//           </div>
//         </div>

//         {/* Forgot password */}
//         <div className="forgot-password">
//           <Link to="/forgot-password">Forgot password?</Link>
//         </div>

//         {/* Submit */}
//         <button type="submit" className="login-btn">
//           Login
//         </button>

//         {/* Register */}
//         <p className="register-text">
//           No account? <Link to="/register">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;
