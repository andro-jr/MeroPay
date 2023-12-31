import React, { useContext, useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import VerifyUser from "./VerifyUser";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/Sidebar";
import FriendsList from "../components/Friend/FriendsList";
// import { TabProvider } from "../context/TabProvider";
// import HomeContents from "../components/home/HomeContents";
// import ReceiveExpenses from "../components/home/ReceiveExpenses";
import Welcome from "../components/Welcome";
import AddExpense from "../components/Expense/AddExpense";
import { ExpenseContext } from "../context/ExpenseProvider";
import { TabContext } from "../context/TabProvider";

const Home = () => {
  const navigate = useNavigate();
  const [trigger, setTrigger] = useState(false);
  const { authInfo, handleLogout } = useContext(AuthContext);
  const { openModal } = useContext(ExpenseContext);
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;
  const { setTabIndex } = useContext(TabContext);

  const checkFirstTime = () => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (!firstLogin) {
      setTrigger(true);
      localStorage.setItem("firstLogin", "true");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/auth/sign-in");
    setTabIndex(0);
    checkFirstTime();
  }, [isLoggedIn, trigger]);

  if (!isVerified) {
    return <VerifyUser />;
  }

  return (
    <div>
      <div className="small-screen-overlay flex flex-col items-center justify-center absolute w-full h-full bg-black/95 z-[100]">
        <div className="image w-[500px] h-[300px]">
          <img
            src="/monitor.png"
            alt=""
            className="w-full h-full object-contain object-center"
          />
        </div>
        <p className="text-white text-3xl lg:text-xl md:text-lg sm:text-sm font-md text-center">
          Please use a device with larger screen ( greater than 800px ){" "}
        </p>
      </div>
      {trigger === true ? <Welcome trigger={trigger} /> : ""}
      <AddExpense />
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
