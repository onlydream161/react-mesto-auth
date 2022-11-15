import React from "react";
import { useLocation, Navigate  } from "react-router-dom";

function ProtectedRoute({ children, loggedIn }) {
  const location = useLocation();

  if (!loggedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
