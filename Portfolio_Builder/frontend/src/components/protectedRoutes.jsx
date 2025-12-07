// src/components/ProtectedRoute.jsx (or wherever it lives)
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectedRoute({ children }) {
  // Destructure 'loading' from the context
  const { isAuthenticated, loading } = useAuth(); 

  // 1. If the initial check is still running, show a loading message/spinner.
  if (loading) {
    // You should replace this with a proper, centered loading spinner component.
    return <div className="p-10 text-center text-lg">Authenticating...</div>; 
  }

  // 2. Once loading is false, check the authentication status.
  return isAuthenticated ? children : <Navigate to="/login" />;
}