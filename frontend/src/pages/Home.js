import { Navigate } from "react-router-dom";

import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
// import { resendEmailVerificationToken } from "../api/auth";
import { NotificationContext } from "../context/NotificationProvider";

const Home = () => {
  const navigate = useNavigate();
  const { authInfo, handleLogout } = useContext(AuthContext);
  // const { updateNotification } = useContext(NotificationContext);
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;
  // const id = authInfo.profile?.id;
  // console.log(id);
  // console.log(authInfo);

  console.log(authInfo);

  // const isVerified = authInfo.profile?.isVerified;
  console.log(isVerified);

  useEffect(() => {
    if (!isLoggedIn) navigate("/auth/sign-in");
    else if (isLoggedIn && !isVerified) {
      console.log(authInfo);
      console.log(isVerified);
      navigate("/auth/verify-user");
    }
  }, [isLoggedIn, isVerified]);

  return (
    <div>
      <Link to="/auth/signup">Signup</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
