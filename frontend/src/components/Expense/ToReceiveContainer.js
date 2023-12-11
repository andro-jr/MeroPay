import React, { useContext, useEffect, useState } from "react";
import { singleExpenseDetail, toReceiveExpense } from "../../api/expense";
import { AuthContext } from "../../context/AuthProvider";
import Loader from "../Loader";
import { ownerDetail } from "../../api/details";
import OwnerNameFetcher from "./OwnerNameFetcher";
import ToReceiveAmountFetcher from "./ToReceiveAmountFetcher";
import ToReceiveExpenseOverlay from "./ToReceiveExpenseOverlay";

const ToReceiveContainer = () => {
  const { authInfo } = useContext(AuthContext);
  const userId = authInfo.profile?.id;

  const [expenses, setExpenses] = useState([]);
  const [expensesId, setExpensesId] = useState();
  const [loading, setLoading] = useState(false);
  const [ownerName, setOwnerName] = useState({});
  const [expenseOwnerId, setExpenseOwnerId] = useState("");

  const [showOverlay, setShowOverlay] = useState(false);
  //   console.log(expenses.length);

  const openModal = () => {
    setShowOverlay(true);
  };

  const closeModal = () => {
    setShowOverlay(false);
    // setOwnId(null);
  };

  const displayToReceive = async (userId) => {
    try {
      setLoading(true);
      const res = await toReceiveExpense(userId);
      setExpenses(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching toPayExpense:", error);
    }
  };

  useEffect(() => {
    displayToReceive(userId);
  }, [userId]);

  const expenseDetail = async (expenseId) => {
    try {
      const { owner } = await singleExpenseDetail(expenseId);
      // console.log("Expense owner", owner);
      setExpenseOwnerId(owner);
      putOwnerId(owner);
    } catch (error) {
      console.log(error);
    }
  };

  const putOwnerId = (expenseOwnerId) => {
    openModal();
  };

  const handleClick = (expenseId) => {
    setExpensesId(expenseId);
    expenseDetail(expenseId);
  };

  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-US");
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          <Loader />
        </div>
      ) : (
        <div className="payment-container">
          {expenses.length > 0 &&
          expenses.some((expense) => expense !== null) ? (
            <div className="expense-container">
              <div className="expense-table">
                <table className="expense-table">
                  <thead>
                    <tr>
                      <th>Expense Name</th>
                      <th>Created by</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses
                      .filter((expense) => expense !== null)
                      .map((expense, index) => (
                        //   <tr key={expense.id}>
                        <tr key={index}>
                          <td>
                            <div className="expense-name-container">
                              <div className="expense-name-box">
                                <p>
                                  {expense.expenseName
                                    ? expense.expenseName
                                    : `Expense-${index + 1}`}
                                </p>
                                <span>
                                  Created on:{" "}
                                  {expense.createdAt
                                    ? formatDateString(expense.createdAt)
                                    : "Default Date"}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p>
                              <OwnerNameFetcher ownerId={expense.owner} />
                            </p>
                          </td>
                          <td>
                            <ToReceiveAmountFetcher members={expense.members} />
                          </td>
                          <td>
                            <button
                              className="expense-pay-button"
                              onClick={() => handleClick(expense._id)}
                            >
                              Check
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No expenses to display.</p>
          )}
        </div>
      )}
      {showOverlay && (
        <ToReceiveExpenseOverlay
          expenseModalOpen={showOverlay}
          expenseModalClose={closeModal}
          ownerId={expenseOwnerId}
          expenseId={expensesId}
        />
      )}
    </div>
  );
};

export default ToReceiveContainer;
