import React, { useContext, useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { GiReceiveMoney, GiMoneyStack, GiPayMoney } from "react-icons/gi";
import { AiTwotoneSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TabContext } from "../context/TabProvider";

const DashboardOption = (to) => {
  const { tabIndex, setTabIndex } = useContext(TabContext);

  const toggle = (index) => {
    setTabIndex(index);
  };

  const dashboardOptions = [
    {
      name: "home",
      icon: <IoHome />,
      optionName: "Home",
      to: "/",
    },

    {
      name: "outgoing",
      icon: <GiPayMoney />,
      optionName: "To Pay",
      to: "/auth/outgoing",
    },
    {
      name: "incomming",
      icon: <GiReceiveMoney />,
      optionName: "To Receive",
      to: "/expense/to-receive",
    },
    {
      name: "setting",
      icon: <AiTwotoneSetting />,
      optionName: "Setting",
      to: "/settings",
    },
  ];

  //   console.log(dashboardOptions[0].name);
  return (
    <div>
      {dashboardOptions.map((option, index) => (
        <Link to={option.to} key={index}>
          <div
            className={`flex flex-row items-center justify-start gap-4 p-4 pr-0 dash-option ${
              tabIndex === index ? "active" : ""
            }`}
            key={index}
            onClick={() => toggle(index)}
          >
            <p
              className={`text-2xl ml-2 ${
                tabIndex === index ? "active-icon" : ""
              }`}
            >
              {option.icon}
            </p>
            <span className={`ml-2 ${tabIndex === index ? "active-text" : ""}`}>
              {option.optionName}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DashboardOption;
