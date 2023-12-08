import React from "react";
import DashboardContainer from "../Dashboard/DashboardContainer";
import ToReceiveContainer from '../Expense/ToReceiveContainer';

const ReceiveExpenses = () => {
  return (
    <DashboardContainer>
      <ToReceiveContainer />
    </DashboardContainer>
  );
};

export default ReceiveExpenses;
