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
        className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out rounded-full px-8 py-3 w-full mt-8 custom_primary_button"
        onClick={handleClick}
      >
        <p className="button_text">Logout</p>
      </button>
    </div>
  );
};

export default Logout;
