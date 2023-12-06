import React from "react";
import DashboardContainer from "../DashboardContainer";

const ReceiveExpenses = () => {
  return (
    <DashboardContainer>
      <div className="payment-container">
        {/* expense title */}
        <div className="payment-expense-title">
          <h1 className="payment-expense">Payments To Receive</h1>
        </div>

        {/* expense-title container */}

        <div className="expense-container">
          <div className="expense-table">
            <table className="expense-table">
              <tr>
                <th>Expense Name</th>
                <th>Created by</th>
                <th>Amount</th>
                <th></th>
              </tr>

              <tr>
                <td>
                  <div className="expense-name-container">
                    {/* <div className="square">
                  <div className="circle"></div>
                </div> */}

                    <div className="expense-name-box">
                      <p>Milan Khaja Ghar</p>
                      <span>Created on: 2023/03/01</span>
                    </div>
                  </div>
                </td>

                <td>
                  <p>Leon</p>
                </td>

                <td>Rs. 5000</td>

                <td>
                  <button className="expense-pay-button">Check</button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="expense-name-container">
                    {/* <div className="square">
                  <div className="circle"></div>
                </div> */}

                    <div className="expense-name-box">
                      <p>Luma Resturant</p>
                      <span>Created on: 2023/03/01</span>
                    </div>
                  </div>
                </td>

                <td>
                  <p>Checking</p>
                </td>

                <td>Rs. 1500</td>

                <td>
                  <button className="expense-pay-button">Check</button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="expense-name-container">
                    {/* <div className="square">
                  <div className="circle"></div>
                </div> */}

                    <div className="expense-name-box">
                      <p>Annapurna Khaja Ghar</p>
                      <span>Created on: 2023/03/01</span>
                    </div>
                  </div>
                </td>

                <td>
                  <p>Prabin</p>
                </td>

                <td>Rs. 500</td>

                <td>
                  <button className="expense-pay-button">Check</button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="expense-name-container">
                    {/* <div className="square">
                  <div className="circle"></div>
                </div> */}

                    <div className="expense-name-box">
                      <p>Luma Resturant</p>
                      <span>Created on: 2023/03/01</span>
                    </div>
                  </div>
                </td>

                <td>
                  <p>Check</p>
                </td>

                <td>Rs. 1500</td>

                <td>
                  <button className="expense-pay-button">Check</button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="expense-name-container">
                    {/* <div className="square">
                  <div className="circle"></div>
                </div> */}

                    <div className="expense-name-box">
                      <p>Luma Resturant</p>
                      <span>Created on: 2023/03/01</span>
                    </div>
                  </div>
                </td>

                <td>
                  <p>Yooo</p>
                </td>

                <td>Rs. 1500</td>

                <td>
                  <button className="expense-pay-button">Check</button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="expense-name-container">
                    {/* <div className="square">
                  <div className="circle"></div>
                </div> */}

                    <div className="expense-name-box">
                      <p>Luma Resturant</p>
                      <span>Created on: 2023/03/01</span>
                    </div>
                  </div>
                </td>

                <td>
                  <p>List</p>
                </td>

                <td>Rs. 1500</td>

                <td>
                  <button className="expense-pay-button">Check</button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default ReceiveExpenses;
