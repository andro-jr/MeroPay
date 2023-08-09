import React, { useContext, useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { GiMoneyStack, GiPayMoney } from "react-icons/gi";
import { AiTwotoneSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TabContext } from "../context/TabProvider";

const DashboardOption = (to) => {

    const {tabIndex,setTabIndex} = useContext(TabContext);

    const toggle = (index) => {
        setTabIndex(index)
    }

    console.log(tabIndex)
    


  const dashboardOptions = [
    {
      name: "home",
      icon: <IoHomeOutline />,
      optionName: "Home",
      to: "/",
    },
    {
      name: "incomming",
      icon: <GiMoneyStack />,
      optionName: "To Receive",
      to: "/expense/to-receive",
    },
    {
      name: "outgoing",
      icon: <GiPayMoney />,
      optionName: "To Pay",
      to: "/auth/outgoing",
    },
    {
      name: "setting",
      icon: <AiTwotoneSetting />,
      optionName: "Setting",
      to: "/setting",
    },
  ];

  //   console.log(dashboardOptions[0].name);
  return (
    <div>
      {dashboardOptions.map((option, index) => (
        <Link to={option.to} key = {index}>
          <div
            className={`flex flex-row items-center justify-start gap-4 p-4 pr-0 dash-option ${tabIndex===index?'active':''}`}
            key={index}
            onClick={() => toggle(index)}
          >
            <p
              className={`text-2xl ml-2 `}
            >
              {option.icon}
            </p>
            <span
              className={`ml-2`}
            >
              {option.optionName}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DashboardOption;
