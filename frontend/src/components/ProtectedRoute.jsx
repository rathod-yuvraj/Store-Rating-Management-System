import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  role,
}) {

  const { user, loading } = useAuth();

  // Wait until authentication finishes
  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch
  if (
    role &&
    user.role !== role
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}