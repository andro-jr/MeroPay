import React, { useState, useContext, createContext } from "react";
export const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ExpenseContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
