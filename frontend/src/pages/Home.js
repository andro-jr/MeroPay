import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const Home = () => {
  // const { isAuth } = useContext(AuthContext);

  return (
    <div>
      <Link to="/auth/signup">Signup</Link>
    </div>
  );
};

export default Home;
