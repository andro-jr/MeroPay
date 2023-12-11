import React, { useContext, useEffect, useState } from "react";
import DashboardContainer from "../Dashboard/DashboardContainer";
import { AuthContext } from "../../context/AuthProvider";
import { FaLongArrowAltRight } from "react-icons/fa";
import AddExpense from "../Expense/AddExpense";
import { ExpenseContext } from "../../context/ExpenseProvider";
import { ownerDetail } from "../../api/details";
import { useNavigate } from "react-router-dom";
import { TabContext } from "../../context/TabProvider";
import { NotificationContext } from "../../context/NotificationProvider";

const HomeContents = ({ name }) => {
  const { authInfo, isAuth } = useContext(AuthContext);
  const{openModal} = useContext(ExpenseContext);
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
    <div>
      
      <DashboardContainer className=" expense__entry-container" onClick={handleClick}>
        <div className="expense__entry-container-inner" onClick={handleClick}>
          <h2 className="expense__entry-title">Start adding expense</h2>
          <p className="expense__entry-para">
            Add your expense and start bill splitting hastle free
          </p>
          <a href="#" className="expense__entry-button" onClick={handleClick}>
            Get started <FaLongArrowAltRight />
          </a>
        </div>

        <div className="bubble" onClick={handleClick}></div>
      </DashboardContainer>
    </div>
  );
};

export default HomeContents;
