import React, { useContext } from "react";
import NavSearch from "./NavSearch";
import { ExpenseContext } from "../../context/ExpenseProvider";

const Navbar = () => {
  const { openModal } = useContext(ExpenseContext);
  const handleClick = (e) => {
    e.preventDefault();
    openModal();
  };

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
