import React, { useState, useEffect } from "react";

const ToReceiveAmountFetcher = ({ members }) => {
  const [totalAmount, setTotalAmount] = useState("Loading...");

  useEffect(() => {
    const calculateTotalAmount = () => {
      try {
        // Calculate the sum of all amounts from the members array
        const sum = members.reduce((total, member) => total + member.amount, 0);
        setTotalAmount(sum);
      } catch (error) {
        console.error("Error calculating total amount:", error);
        setTotalAmount("Error calculating total amount");
      }
    };

    calculateTotalAmount();
  }, [members]);

  return <span>Rs. {totalAmount}</span>;
};

export default ToReceiveAmountFetcher;