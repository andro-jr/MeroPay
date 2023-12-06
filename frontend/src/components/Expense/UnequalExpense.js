import React, { useState, useEffect, useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseProvider";
import Button from "../Button";
import { getAllFriends } from "../../api/friend";
import { AuthContext } from "../../context/AuthProvider";
import { NotificationContext } from "../../context/NotificationProvider";
import { createExpense } from "../../api/expense";

const UnequalExpense = () => {
  const { authInfo } = useContext(AuthContext);
  const userId = authInfo.profile?.id;
  const [loading, setLoading] = useState(false);
  const { isOpen, closeModal } = useContext(ExpenseContext);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState(Array(1).fill(""));
  const availableUsers = ["Prabin", "Ram", "Shyam", "Leon", "HeroLal"];
  const [disabledUsers, setDisabledUsers] = useState([]);

  //stores the array of amount and the total of the array
  const [amount, setAmount] = useState([]);
  const [total, setTotal] = useState(0);


  const [amounts, setAmounts] = useState([]);
  const [expenseName, setExpenseName] = useState("");

  // notificaton provider
  const { updateNotification } = useContext(NotificationContext);

  // used to handle the selected users for creating expense
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  //select expenseType
  const [equal, setEqual] = useState(true);
  const [unequal, setUnEqual] = useState(true);
  const [label, setLabel] = useState(false);

  const [friends, setFriends] = useState([]);
  // const [friendsName, setFriendsName] = useState([]);

  const fetchAllFriends = async (userId) => {
    const res = await getAllFriends(userId);
    // console.log(userId);
    setFriends(res);
  };

  const friendsNames = friends.map((fri) => fri.name);

  // calls the function to fetch the friends from the server as soon as the page loads
  useEffect(() => {
    fetchAllFriends(userId);
  }, []);


  // handles the change of expense type
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

  // handles the change in user for the creation of the expense
  const handleNumberChange = (e) => {
    const newSelectedNumber = parseInt(e.target.value, 10);
    setSelectedNumber(newSelectedNumber);

    // Ensure that the selectedUsers array has the same length as the selected number
    if (selectedUsers.length !== newSelectedNumber) {
      setSelectedUsers(Array(newSelectedNumber).fill(""));
    }
  };

  // handles which user is selected and which to disable
  const handleUserSelect = (index, user) => {
    const newSelectedUsers = [...selectedUsers];
    newSelectedUsers[index] = user;
    setSelectedUsers(newSelectedUsers);
  };

  // handles the change in value of each input field

  const handleAmountChange = (index, amount) => {
    // e.preventDefault();

    // Check if the input is a valid number (or empty string)
    // if (/^\d*$/.test(amount)) {
    //   setAmount((prevAmount) => {
    //     const newAmount = amount;
    //     return newAmount;
    //   });
    // } else {
    //   // Clear the input if non-numeric characters are present
    //   setAmount("");

    const updatedAmounts = [...amounts];
    updatedAmounts[index] = Number(amount); // Convert the amount to a number
    setAmounts(updatedAmounts);

    // Calculate the total of the array and update the total state
    const newTotal = updatedAmounts.reduce((acc, val) => acc + val, 0);
    setTotal(newTotal);
  };

  // handles the calculation of total amount and verifies if the final amount is the same as the normal total

  const calcEqual = (newAmount) => {
    const totalAmount = newAmount;
    // console.log("totalAmount", totalAmount);


    
  };


  // handles the shifting of active label
  const shiftLabel = () => {
    const input = document.querySelector(".expense-name");
    const inputLabel = document.querySelector(".expense-name-label");

    if (!label) {
      inputLabel.classList.add("active");
      setLabel(true);
    }
  };


  // handles expense creation
  const handleSubmit = async (e) => {
    setLoading(true);

    if(!expenseName || selectedUsers.length === 0) {
      closeModal();
      updateNotification("error", "All fields must be filled");
    }

    console.log("entered here");
    e.preventDefault();

    // Creation of an array of member objects with userId and amount
    const amountToPay = amount.map((amt, index) => ({
      amount: amt,
    }));

    const membersData = selectedUserIds.map((userId, index) => ({
      userId: userId,
      amount: amountToPay
    }));

    // Creation of the data object in the desired format
    const data = {
      owner: userId,
      total: total,
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


  // handles click while clickin outsite the modal box
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
      <div className="unequal-split__select">
        <label>Select the number of people</label>
        <select onChange={handleNumberChange} value={selectedNumber}>
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
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
              <div className="unequal-expenseform-value">
              <input
                  type="text"
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                  placeholder="enter the amount"
                />
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

export default UnequalExpense;
