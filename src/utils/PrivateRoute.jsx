import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/isLogedin";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = isLoggedIn();
    setIsAuthenticated(authStatus);
    // console.log("Auth status:", authStatus);
    if (!authStatus) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return isAuthenticated ? children : null;
}

export default PrivateRoute;




