import React, { useContext, useEffect, useState } from "react";
import NavSearch from "./NavSearch";
import { ExpenseContext } from "../../context/ExpenseProvider";
import { ownerDetail } from "../../api/details";
import { NotificationContext } from "../../context/NotificationProvider";
import { useNavigate } from "react-router-dom";
import { TabContext } from "../../context/TabProvider";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
  const { openModal } = useContext(ExpenseContext);

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   openModal();
  // };

  const { authInfo, isAuth } = useContext(AuthContext);
  const [data, setData] = useState();
  const username = authInfo.profile?.name;
  const userId = authInfo?.profile?.id;
  const navigate = useNavigate();
  const { setTabIndex } = useContext(TabContext);
  const { updateNotification } = useContext(NotificationContext);


  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await ownerDetail(userId);
        setData(data);
      } catch (error) {
        console.error("Error fetching owner details:", error);
      }
    };

    getUserData();
  }, [userId]);

  const checkReady = () => {
    if(data.paymentQR) {
      openModal();
    }
    else{
      updateNotification("error", "Please upload your QR code first");
      navigate('/settings');
      setTabIndex(4);
      isAuth();
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    checkReady();
  }

  return (
    <div className="navbar">
      <div className="nav-container max-w-[1800px] mx-auto ">
        <div className="logo">
          <h3 className="text-3xl logo-text font-bold">MeroPay</h3>
        </div>
        <NavSearch />

        <div className="account">
          <button
            className="px-8 py-3 rounded-full  text-white  transition-all duration-0 hover:duration-150 ease-in-out capitalize custom_primary_button"
            onClick={handleClick}
          >
            <p className="button_text">create</p>
          </button>
          {/* <div className="account-avatar">
            <img src="/avatar.jpg" alt="user-avatar" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
