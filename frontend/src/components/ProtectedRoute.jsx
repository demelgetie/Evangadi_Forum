import { Navigate } from "react-router-dom";

// Blocks access if user is not logged in
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
