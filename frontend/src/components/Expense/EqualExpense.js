import React, { useState, useEffect, useContext } from "react";
import Button from "../Button";
import { ExpenseContext } from "../../context/ExpenseProvider";
import { getAllFriends } from "../../api/friend";
import { NotificationContext } from "../../context/NotificationProvider";
import { AuthContext } from "../../context/AuthProvider";

import { createExpense } from "../../api/expense";
import Loader from "../Loader";

const EqualExpense = () => {
  const [loading, setLoading] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const { updateNotification } = useContext(NotificationContext);
  const { isOpen, closeModal } = useContext(ExpenseContext);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState(Array(1).fill(""));
  const [disabledUsers, setDisabledUsers] = useState([]);
  const [amount, setAmount] = useState(0);
  const [selectedAmounts, setSelectedAmounts] = useState(
    Array(selectedUsers.length).fill(0)
  );
  const [splitAmount, setSplitAmount] = useState(0);

  //select expenseType
  const [equal, setEqual] = useState(true);
  const [unequal, setUnEqual] = useState(true);
  const [label, setLabel] = useState(false);

  //fetching friends
  const { authInfo } = useContext(AuthContext);
  const userId = authInfo.profile?.id;
  const [friends, setFriends] = useState([]);

  const fetchAllFriends = async (userId) => {
    const res = await getAllFriends(userId);
    setFriends(res);
  };

  const friendsNames = friends.map((fri) => fri.name);

  useEffect(() => {
    fetchAllFriends(userId);
  }, []);

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
      setSelectedAmounts(Array(newSelectedNumber).fill(0));
    }
  };

  const updateExpenseName = (e) => {
    e.preventDefault();
    setExpenseName(e.target.value) 
  }

  const handleUserSelect = (index, user) => {
    const newSelectedUsers = [...selectedUsers];
    newSelectedUsers[index] = user;
    setSelectedUsers(newSelectedUsers);

    // Find the friend based on the selected user's name
    const friend = friends.find((friend) => friend.name === user);

    if (friend) {
      // Update another state array with the userId
      const newSelectedUserIds = [...selectedUserIds];
      newSelectedUserIds[index] = friend.userId;
      setSelectedUserIds(newSelectedUserIds);
      // console.log(newSelectedUserIds)
    }
  };

  const handleAmountChange = (e) => {
    const amount = e.target.value;

    // Check if the input is a valid number (or empty string)
    if (/^\d*$/.test(amount)) {
      setAmount(Number(amount));
    } else {
      // Clear the input if non-numeric characters are present
      // setAmount(0);
      return;
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

  const handleSubmit = async (e) => {
    setLoading(true);

    if(!expenseName || selectedUsers.length === 0) {
      closeModal();
      updateNotification("error", "All fields must be filled");
    }

    console.log("entered here");
    e.preventDefault();

    // Creation of an array of member objects with userId and amount
    const membersData = selectedUserIds.map((userId, index) => ({
      userId: userId,
      amount: splitAmount,
    }));

    // Creation of the data object in the desired format
    const data = {
      owner: userId,
      total: amount,
      members: membersData,
    };

    await createExp(data);
    setLoading(false);

    closeModal();
  };

  const createExp = async (data) => {
    const response = await createExpense(data);
    console.log(response);
    const { error, message } = response;
    if (error) updateNotification("error", error);
    if (message) updateNotification("success", message);

    // handleRefresh();
  };

  useEffect(() => {
    // Reset disabled users when the selected number changes
    setDisabledUsers([]);
    calcEqual(amount);
  }, [selectedNumber, amount, loading]);

  return (
    <div className="expense-entry-form">
      <div className="expense-name-container">
        <input
          type="text"
          className="expense-name"
          onClick={shiftLabel}
          value={expenseName}
          onChange = {updateExpenseName}
        />
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
            onChange={(e) => handleAmountChange(e)}
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
                {friendsNames.map((user, userIndex) => (
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

          <button
            className={`px-8 py-3 rounded-md mt-8 w-full text-white custom_primary_button`}
            onClick={(e) => handleSubmit(e)}
          >
            <div className="button_text ">
              {loading ? <Loader /> : "CreateExpense"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EqualExpense;
