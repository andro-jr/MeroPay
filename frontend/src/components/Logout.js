import React, { useContext } from "react";
import Button from "./Button";
import { AuthContext } from "../context/AuthProvider";

const Logout = () => {
  const { handleLogout } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    console.log("check");
    handleLogout();
  };

  return (
    <div>
      <button
        className=" text-white  transition-all duration-0 hover:duration-150 ease-in-out rounded-full px-8 py-3 w-full mt-8 custom_primary_button flex items-center justify-center gap-4"
        onClick={handleClick}
      >
        <p className="button_text">Logout</p>
        <div className="logout-icon button_text">
          <img src="/logout.svg" alt="" className="logout-icon" />
        </div>
      </button>
    </div>
  );
};

export default Logout;
