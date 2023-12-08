import React, { useContext, useState } from "react";
import DashboardContainer from "../Dashboard/DashboardContainer";
import { AuthContext } from "../../context/AuthProvider";
import { FaLongArrowAltRight } from "react-icons/fa";
import AddExpense from "../Expense/AddExpense";
import { ExpenseContext } from "../../context/ExpenseProvider";

const HomeContents = ({ name }) => {
  const { authInfo } = useContext(AuthContext);
  const{openModal} = useContext(ExpenseContext);


  const username = authInfo.profile?.name;

  const handleClick = (e) => {
    e.preventDefault();
    openModal();
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
