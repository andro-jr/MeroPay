import React, { createContext, useState } from 'react';

export const RefreshDataContext = createContext();

const RefreshDataProvider = ({ children }) => {
  const [refreshBool, setRefreshBool] = useState(true);

  const handleRefresh = () => {
    setRefreshBool((prev) => !prev);
  };

  return (
    <RefreshDataContext.Provider value={{ handleRefresh, refreshBool }}>
      {children}
    </RefreshDataContext.Provider>
  );
};

export default RefreshDataProvider;
