import React, { useContext, useEffect, useState } from "react";
import { toPayExpense } from "../../api/expense";
import { AuthContext } from "../../context/AuthProvider";
import Loader from "../Loader";

const ToPayContainer = () => {
  const { authInfo } = useContext(AuthContext);
  const userId = authInfo.profile?.id;

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  //   console.log(expenses.length);

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

  useEffect(() => {
    displayToPay(userId);
  }, [userId]);

  const handleClick = () => {
    // displayToPay(userId);

    console.log("check passed");
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          <Loader />
        </div>
      ) : (
        <div className="payment-container">
          {expenses.length > 0 ? (
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
                                {/* <p>{expense.name ? expense.name : "Default Name"}</p> */}
                                <p> Milan Khaja ghar</p>
                                <span>
                                  Created on:
                                  {/* {expense.date ? expense.date : "Default Date"} */}
                                  2002-03-01
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            {/* <p>{expense.owner ? expense.owner : "Default Owner"}</p> */}
                            <p>Leon</p>
                          </td>
                          <td>
                            {/* Rs. {expense.amount ? expense.amount : "Default Amount"} */}
                            Rs. 10000
                          </td>
                          <td>
                            <button
                              className="expense-pay-button"
                              onClick={() => handleClick()}
                            >
                              Pay
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
    </div>
  );
};

export default ToPayContainer;
