import React from 'react';
import { twMerge } from 'tailwind-merge';

const DashboardContainer = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        'bg-white shadow-sm rounded-lg p-5 max-h-[75vh] overflow-y-auto',
        className
      )}
    >
      {children}
    </div>
  );
};
export default DashboardContainer;
