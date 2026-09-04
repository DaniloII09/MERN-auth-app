import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

export const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  if (isAuthenticated && !user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

export const RequireVerification = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};