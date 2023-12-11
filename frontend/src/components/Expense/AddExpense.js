import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../../context/ExpenseProvider";
import { RxCross1 } from "react-icons/rx";
import { RxTriangleDown } from "react-icons/rx";
import Button from "../Button";
import { MdWidthFull } from "react-icons/md";
import EqualExpense from "./EqualExpense";
import UnequalExpense from "./UnequalExpense";

const AddExpense = () => {
  const { isOpen, closeModal } = useContext(ExpenseContext);
  const [openDrop, setOpenDrop] = useState(false);

  // const [selectedNumber, setSelectedNumber] = useState(1);
  // const [selectedUsers, setSelectedUsers] = useState(Array(1).fill(""));
  const [amount, setAmount] = useState(0);
  const [splitAmount, setSplitAmount] = useState(0);

  //select expenseType
  const [equal, setEqual] = useState(true);

  const changeExpenseType = (e) => {
    e.preventDefault();
    const equalExpense = document.querySelector(".equal-split");
    const unequalExpense = document.querySelector(".unequal-split");

    equalExpense.addEventListener("click", () => {
      unequalExpense.classList.remove("active");
      equalExpense.classList.add("active");
      setEqual(true);
    });

    unequalExpense.addEventListener("click", () => {
      equalExpense.classList.remove("active");
      unequalExpense.classList.add("active");
      setEqual(() => {
        return false;
      });
    });
  };

  

  const handleClick = () => {
    closeModal();

  };

  return (
    <div>
      {isOpen ? (
        <div className="modal">
          <div className="overlay">
            <div className="p-5 bg-white rounded-xl mb-4 flex flex-col overlay-inner__modal relative">
              <RxCross1 className="cross" onClick={handleClick} />

              <div className="expense-entry">
                <div className="expense-type">
                  <div
                    className="equal-split cursor-pointer active"
                    onClick={changeExpenseType}
                  >
                    <h2>Equal Split</h2>
                  </div>
                  <div
                    className="unequal-split cursor-pointer"
                    onClick={changeExpenseType}
                  >
                    <h2>Unequal Split</h2>
                  </div>
                </div>

                {equal ? (
                  <EqualExpense />
                ) : (
                 <UnequalExpense />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddExpense;
