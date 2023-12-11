import React, { useState, useEffect, useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseProvider";
import { getAllFriends } from "../../api/friend";
import { NotificationContext } from "../../context/NotificationProvider";
import { AuthContext } from "../../context/AuthProvider";

import { createExpense } from "../../api/expense";
import Loader from "../Loader";
import OwnerNameFetcher from "./OwnerNameFetcher";
import { TabContext } from "../../context/TabProvider";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../context/LoaderProvider";

const EqualExpense = () => {
  const [loading, setLoading] = useState(false);

  // const [selectedUserIds, setSelectedUserIds] = useState([]);
  const { updateNotification } = useContext(NotificationContext);
  const { setTabIndex } = useContext(TabContext);
  const { isOpen, closeModal } = useContext(ExpenseContext);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const { setShowLoader } = useContext(LoaderContext);

  //select expenseType
  const [equal, setEqual] = useState(true);
  const [unequal, setUnEqual] = useState(true);

  //fetching friends
  const { authInfo, isAuth } = useContext(AuthContext);
  const userId = authInfo.profile?.id;
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  // console.log(friends);

  const fetchAllFriends = async (userId) => {
    const res = await getAllFriends(userId);
    setFriends(res);
  };

  const friendsNames = friends.map((fri) => fri.name);

  const [expenseName, setExpenseName] = useState("");
  const [members, setMembers] = useState([]);
  const [usersId, setUsersId] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpenseNameDisabled, setIsExpenseNameDisabled] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);

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

  const handleAddMember = () => {
    if (usersId && amount && !selectedFriends.includes(usersId)) {
      const selectedFriend = friends.find(
        (friend) => friend.userId === usersId
      );
      if (selectedFriend) {
        const newMember = {
          userId: selectedFriend.userId,
          amount: amount,
        };

        setMembers((prevMembers) => [...prevMembers, newMember]);
        setUsersId("");
        setIsExpenseNameDisabled(true);

        // Update selectedFriends to track the selected user
        setSelectedFriends((prevSelectedFriends) => [
          ...prevSelectedFriends,
          usersId,
        ]);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for the API call
    const requestData = {
      owner: userId,
      expenseName,
      members,
    };

    if (!members.length) {
      console.log("Please add at least one member");
      updateNotification("error", "Please add at least one member");
      return;
    }
    setShowLoader(true);

    const { error, message } = await createExpense(requestData);
    setShowLoader(false);
    if (error) updateNotification("error", error);
    if (message) updateNotification("success", message);

    // Reset form fields
    setExpenseName("");
    setMembers([]);
    closeModal();
    setTabIndex(2);
    navigate("/expense/to-receive");
    isAuth();
  };

  return (
    <div>
      {/* <h1 className="font-bold text-xl">Expense Form</h1> */}
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="expenseName">Expense Name:</label>
          <input
            type="text"
            id="expenseName"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            className="outline-none border border-gray-700 px-4 py-2 mt-2 rounded-sm"
            required
            disabled={isExpenseNameDisabled}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="userId">Member</label>
          <select
            id="userId"
            value={usersId}
            onChange={(e) => setUsersId(e.target.value)}
            className="outline-none border border-gray-700 px-4 py-2 mt-2 pl-1 rounded-sm mb-4"
          >
            <option value="" disabled>
              Select a friend
            </option>
            {friends.map((friend) => (
              <option
                key={friend.userId}
                value={friend.userId}
                className="outline-none border border-gray-700 px-4 py-2 mt-2 pl-1 rounded-sm capitalize"
              >
                {friend.name}
              </option>
            ))}

            {/* {friends
              .filter((friend) => !selectedFriends.includes(friend.userId))
              .map((friend) => (
                <option
                  key={friend.userId}
                  value={friend.userId}
                  className="outline-none border border-gray-700 px-4 py-2 mt-2 pl-1 rounded-sm capitalize"
                >
                  {friend.name}
                </option>
              ))} */}
          </select>

          <label htmlFor="amount">Amount (Same for each)</label>
          <input
            type="text"
            id="amount"
            autoComplete="off"
            value={amount}
            onChange={(e) => {
              const enteredValue = e.target.value;

              // Check if the entered value is a valid number
              if (!isNaN(enteredValue)) {
                // Update the state only if it's a valid number
                setAmount(enteredValue);
              }
            }}
            className="outline-none border border-gray-700 px-4 py-2 mt-2 rounded-sm"
            disabled={isExpenseNameDisabled}
          />
          <button
            type="button"
            onClick={handleAddMember}
            className="mt-6 rounded-xl border border-blue-600 px-6 py-4 bg-blue-600 text-white"
          >
            Add Member
          </button>
        </div>

        <div className="mt-16">
          {/* Display the added members */}
          <table className="w-full">
            <tr>
              <th className="border-r border-b px-4 py-2 w-56">
                Expense Member
              </th>
              <th className="border-b px-4 py-2 w-56">Amount ( for each )</th>
            </tr>
            {members.map((member, index) => (
              <tr key={index}>
                <td className="border-b border-r px-4 py-2 w-56">
                  <OwnerNameFetcher ownerId={member.userId} />
                </td>
                <td className="border-b  px-4 py-2 w-56">{` Rs. ${member.amount}`}</td>
              </tr>
            ))}
          </table>
        </div>
        <button
          type="submit"
          className="mt-12 rounded-xl border border-blue-600 px-6 py-4 w-full bg-blue-600 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EqualExpense;
