import React, { useContext } from "react";
import Modal from "../modal/Modal";
import { approveExpense } from "../../api/expense";
import { AuthContext } from "../../context/AuthProvider";
import { NotificationContext } from "../../context/NotificationProvider";
import { LoaderContext } from "../../context/LoaderProvider";
import { TabContext } from "../../context/TabProvider";
import { useNavigate } from "react-router-dom";
import { RefreshDataContext } from "../../context/RefreshDataProvider";

const ExpenseApprovalOverlay = ({
  viewModalOpen,
  viewModalClose,
  screenshot,
  expenseId,
  expenseUserId,
  children,
}) => {
  // console.log(expenseId);
  const { isAuth } = useContext(AuthContext);
  //   const userId = authInfo.profile?.id;

  console.log(expenseUserId);
  const { handleRefresh } = useContext(RefreshDataContext);
  const { updateNotification } = useContext(NotificationContext);
  const { setShowLoader } = useContext(LoaderContext);
  const { setTabIndex } = useContext(TabContext);
  const navigate = useNavigate();

  const approvePayment = async () => {
    try {
      setShowLoader(true);
      const data = await approveExpense(expenseId, expenseUserId);
      const { message, error } = data;
      setShowLoader(false);
      if (error) return updateNotification("error", error);
      setShowLoader(false);
      updateNotification("success", message);
    } catch (error) {
      console.log(error);
      updateNotification("error", error);
    }

    setTabIndex(0);
    navigate("/");
    isAuth();
    handleRefresh();
  };

  return (
    <Modal isOpen={viewModalOpen} closeModal={viewModalClose}>
      <div className="flex flex-col items-center justify-center text-3xl font-bold mb-12">
        <h3 className="mb-12">
          <span className="3xl capitalize">Payment Recipt</span>
        </h3>
        <div className="flex flex-col-items-center justify-center paymentQR_image p-8 ">
          <img
            src={screenshot}
            alt="payment receipt"
            className="w-[200px] h-[200px] pointer-events-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          className="expense-view-button"
          onClick={() => approvePayment()}
        >
          Approve
        </button>
      </div>
    </Modal>
  );
};

export default ExpenseApprovalOverlay;
