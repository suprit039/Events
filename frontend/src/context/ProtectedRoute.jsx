import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="p-6">Checking authentication...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
