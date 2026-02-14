import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const auth = useAuth();

  // If still loading, show nothing or a loader
  if (!auth || auth.loading) {
    return null;
  }

  // If already authenticated, redirect to home
  if (auth.isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // Otherwise allow access to public route (login/signup)
  return children;
};

export default PublicRoute;
