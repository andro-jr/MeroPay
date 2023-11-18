import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const ButtonSecondVariant = ({ title }) => {
  return (
    <div className="secondVariant">
      {title}
      <span>
        <FaLongArrowAltRight />
      </span>
    </div>
  );
};

export default ButtonSecondVariant;
