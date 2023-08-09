import React, { useContext, useEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import VerifyUser from "./VerifyUser";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/Sidebar";
import Details from "../components/Details";
import FriendsList from "../components/FriendsList";
import { TabProvider } from "../context/TabProvider";
import HomeContents from "../components/home/HomeContents";
import ReceiveExpenses from "../components/home/ReceiveExpenses";

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
      <Navbar />
      <div className="homepage h-[85vh]">
        <div className="home-container max-w-[1440px] mx-auto">
          <Sidebar />
          <Outlet />
          <FriendsList />
        </div>
      </div>
    </div>
  );
};

export default Home;
