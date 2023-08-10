import React from "react";
import { twMerge } from "tailwind-merge";

const DashboardContainer = ({ children, className }) => {
  return (
    <div className={twMerge("bg-white border rounded-lg p-4", className)}>
      {children}
    </div>
  );
};

export default DashboardContainer;
