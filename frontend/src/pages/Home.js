import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import VerifyUser from "./VerifyUser";

const Home = () => {
  const navigate = useNavigate();
  const { authInfo, handleLogout } = useContext(AuthContext);
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;

  useEffect(() => {
    if (!isLoggedIn) navigate("/auth/sign-in");
  }, [isLoggedIn]);

  if (!isVerified) {
    return <VerifyUser />;
  }

  return (
    <div>
      <Link to="/auth/signup">Signup</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
