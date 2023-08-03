import React from "react";

const Button = ({ title, styles }) => {
  return (
    <button className={`px-8 py-3 rounded-md w-full mt-8 ${styles}`}>
      {title}
    </button>
  );
};

export default Button;
