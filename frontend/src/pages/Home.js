import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Home = () => {
  const navigate = useNavigate();
  const { authInfo } = useContext(AuthContext);
  const { isLoggedIn } = authInfo;

  useEffect(() => {
    if (!isLoggedIn) navigate("/auth/sign-in");
  }, [isLoggedIn]);

  return (
    <div>
      <Link to="/auth/signup">Signup</Link>
      =======
      <Link to="/auth/sign-up">Signup</Link>
    </div>
  );
};

export default Home;
