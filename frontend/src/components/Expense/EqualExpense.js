import React, { useState, useEffect, useContext } from "react";
import Button from "../Button";
import { ExpenseContext } from "../../context/ExpenseProvider";

const EqualExpense = () => {
  const { isOpen, closeModal } = useContext(ExpenseContext);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState(Array(1).fill(""));
  const availableUsers = ["Prabin", "Ram", "Shyam", "Leon", "HeroLal"];
  const [disabledUsers, setDisabledUsers] = useState([]);
  const [amount, setAmount] = useState(0);
  const [splitAmount, setSplitAmount] = useState(0);

  //select expenseType
  const [equal, setEqual] = useState(true);
  const [unequal, setUnEqual] = useState(true);
  const [label, setLabel] = useState(false);

  const changeExpenseType = (e) => {
    e.preventDefault();
    const equalExpense = document.querySelector(".equal-split");
    const unequalExpense = document.querySelector(".unequal-split");

    equalExpense.addEventListener("click", () => {
      unequalExpense.classList.remove("active");
      equalExpense.classList.add("active");
      setUnEqual(false);
      setEqual(true);
    });

    unequalExpense.addEventListener("click", () => {
      equalExpense.classList.remove("active");
      unequalExpense.classList.add("active");
      setEqual(false);
      setUnEqual(true);
    });
  };

  const handleNumberChange = (e) => {
    const newSelectedNumber = parseInt(e.target.value, 10);
    setSelectedNumber(newSelectedNumber);

    // Ensure that the selectedUsers array has the same length as the selected number
    if (selectedUsers.length !== newSelectedNumber) {
      setSelectedUsers(Array(newSelectedNumber).fill(""));
    }
  };

  const handleUserSelect = (index, user) => {
    const newSelectedUsers = [...selectedUsers];
    newSelectedUsers[index] = user;
    setSelectedUsers(newSelectedUsers);
  };

  const handleAmountChange = (e) => {
    e.preventDefault();
    const amount = e.target.value;

    // Check if the input is a valid number (or empty string)
    if (/^\d*$/.test(amount)) {
      setAmount((prevAmount) => {
        const newAmount = amount;
        return newAmount;
      });
    } else {
      // Clear the input if non-numeric characters are present
      setAmount("");
    }
  };

  const calcEqual = (newAmount) => {
    const totalAmount = newAmount;
    // console.log("totalAmount", totalAmount);
    const equalSplit = (totalAmount / selectedNumber).toFixed(2);
    setSplitAmount(() => {
      const newSplit = equalSplit;
      return newSplit;
    });
  };

  const shiftLabel = () => {
    const input = document.querySelector(".expense-name");
    const inputLabel = document.querySelector(".expense-name-label");

    if (!label) {
      inputLabel.classList.add("active");
      setLabel(true);
    }
  };

  const handleClick = () => {
    closeModal();
    setSelectedNumber(1);
    setSplitAmount();
    setAmount();
    setSelectedUsers(Array(1).fill(""));
  };

  useEffect(() => {
    // Reset disabled users when the selected number changes
    setDisabledUsers([]);
    calcEqual(amount);
  }, [selectedNumber, amount]);
  
  return (
    <div className="expense-entry-form">
      <div className="expense-name-container">
        <input type="text" className="expense-name" onClick={shiftLabel} />
        <label className="expense-name-label" onClick={shiftLabel}>
          Expense Name
        </label>
      </div>
      <div className="members-number__select-and-amount">
        <select onChange={handleNumberChange} value={selectedNumber}>
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>

        <div className="equal-expenseform-value">
          <input
            type="text"
            placeholder="enter the total amount"
            onChange={handleAmountChange}
            value={amount}
          />
        </div>
      </div>

      <h3 className=" split_headline">Select your friends to split the bill</h3>
      <div className="equal-expenses__form">
        <div className="equal-expenseform-user">
          {selectedUsers.map((selectedUser, index) => (
            <div key={index} className="equal-expense-amount__provider">
              <select
                onChange={(e) => handleUserSelect(index, e.target.value)}
                value={selectedUser}
                className="select-user"
              >
                <option value="" disabled>
                  Select a user
                </option>
                {availableUsers.map((user, userIndex) => (
                  <option
                    key={userIndex}
                    value={user}
                    disabled={
                      selectedUsers.includes(user) &&
                      selectedUsers.indexOf(user) !== index
                    }
                  >
                    {user}
                  </option>
                ))}
              </select>
              <div className="equal-expenseform-value">
                {splitAmount === "" ? (
                  <span>Rs. {splitAmount} </span>
                ) : (
                  <span>Rs.{splitAmount}</span>
                )}
              </div>
            </div>
          ))}

          <Button title="Create Expense" styles="w-2/3 text-white" />
        </div>
      </div>
    </div>
  );
};

export default EqualExpense;
