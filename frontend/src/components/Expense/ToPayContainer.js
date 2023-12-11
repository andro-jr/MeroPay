import React, { useContext, useEffect, useState } from "react";
import { singleExpenseDetail, toPayExpense } from "../../api/expense";
import { AuthContext } from "../../context/AuthProvider";
import Loader from "../Loader";
import ToPayExpenseOverlay from "./ToPayExpenseOverlay";
import { ownerDetail } from "../../api/details";
import OwnerNameFetcher from "./OwnerNameFetcher";
import AmountFetcher from "./AmountFetcher";

const ToPayContainer = () => {
  const { authInfo } = useContext(AuthContext);
  const userId = authInfo.profile?.id;

  const [expenses, setExpenses] = useState([]);
  const [expensesId, setExpensesId] = useState();

  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [ownId, setOwnId] = useState();

  const [expenseOwnerId, setExpenseOwnerId] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const openModal = () => {
    setShowOverlay(true);
  };

  const closeModal = () => {
    setShowOverlay(false);
    setOwnId(null);
  };

  // console.log(expensesId);

  const displayToPay = async (userId) => {
    try {
      setLoading(true);
      const res = await toPayExpense(userId);
      setExpenses(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching toPayExpense:", error);
    }
  };

  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-US");
  };

  useEffect(() => {
    displayToPay(userId);

    if (ownId !== null && showOverlay) {
      openModal();
    }
  }, [userId, ownId, showOverlay]);

  // console.log(ownId);

  const expenseDetail = async (expenseId) => {
    try {
      const { owner } = await singleExpenseDetail(expenseId);
      console.log("Expense owner", owner);
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
                      .filter((expense) =>
                        expense.members.some(
                          (member) =>
                            member.userId === userId &&
                            ["pending", "unapproved"].includes(member.status)
                        )
                      )
                      .map((expense, index) => (
                        <tr key={expense._id}>
                          <td>
                            <div className="expense-name-container">
                              <div className="expense-name-box">
                                <p>
                                  {expense.expenseName
                                    ? expense.expenseName
                                    : `Expense-${index + 1}`}
                                </p>
                                {/* <p> Milan Khaja ghar</p> */}
                                <span>
                                  Created on:{" "}
                                  {expense.createdAt
                                    ? formatDateString(expense.createdAt)
                                    : "Default Date"}
                                  {/* 2002-03-01 */}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <OwnerNameFetcher ownerId={expense.owner} />
                          </td>
                          <td>
                            <AmountFetcher members={expense.members} />
                          </td>
                          <td>
                            {/* <button
                              className="expense-pay-button"
                              onClick={() => handleClick(expense._id)}
                            >
                              Pay
                            </button> */}
                            {expense.members.some(
                              (member) =>
                                member.userId === userId &&
                                member.status === "unapproved"
                            ) ? (
                              <p className="text-sm font-medium">Pending Approval</p>
                            ) : (
                              <button
                                className="expense-pay-button"
                                onClick={() => handleClick(expense._id)}
                              >
                                Pay
                              </button>
                            )}
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
        <ToPayExpenseOverlay
          expenseModalOpen={showOverlay}
          expenseModalClose={closeModal}
          ownerId={expenseOwnerId}
          expenseId={expensesId}
        />
      )}
    </div>
  );
};

export default ToPayContainer;
