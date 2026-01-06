import { useEffect, useState, createContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion";
import QuestionDetail from "./pages/QuestionDetail";
import api from "./axios/axios";
import ForgotPassword from "./components/ForgotPassword";

export const Appstate = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true); // ← NEW: Tracks if we're checking token
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function checkUser() {
      if (!token) {
        setUser(null);
        setLoadingAuth(false);
        return;
      }

      try {
        const { data } = await api.get("/check"); // your backend auth check endpoint
        setUser(data);
      } catch (error) {
        console.log("Token invalid or expired");
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoadingAuth(false); // Always stop loading, even on error
      }
    }

    checkUser();
  }, [token]);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (loadingAuth) {
      // Show a clean loader while checking auth
      return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <Appstate.Provider value={{ user, setUser }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Routes */}
        <Route path="/home" element={<Home />} />
        <Route
          path="/ask"
          element={
            <ProtectedRoute>
              <AskQuestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/question/:id"
          element={
            <ProtectedRoute>
              <QuestionDetail />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Appstate.Provider>
  );
}

export default App;
