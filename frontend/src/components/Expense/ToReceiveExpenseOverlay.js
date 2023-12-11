import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { ownerDetail } from "../../api/details";
import { singleExpenseDetail } from "../../api/expense";
import OwnerNameFetcher from "./OwnerNameFetcher";
import ExpenseApprovalOverlay from "./ExpenseApprovalOverlay";

const ToReceiveExpenseOverlay = ({
  expenseModalOpen,
  expenseModalClose,
  ownerId,
  expenseId,
}) => {
  const [memberDetails, setMemberDetails] = useState([]);

  const [openViewModal, setOpenViewModal] = useState(false);
  const [paymentImage, setPaymentImage] = useState("");
  
  const [expenseUserId, setExpenseUserId] = useState("");
  

  // for viewing screenshot for approval
  const openView = () => {
    setOpenViewModal(true);
  };

  const closeView = () => {
    setOpenViewModal(false);
  };

  const expenseDetail = async () => {
    try {
      const data = await singleExpenseDetail(expenseId);
      //   console.log(data);
      const { members } = data;

      setMemberDetails(members);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    expenseDetail();
  }, []);

  const handleClick = (paymentImage, userId) => {
    // console.log("payment Image", paymentImage);
    setPaymentImage(paymentImage);
    setExpenseUserId(userId);
    openView();
  };

  return (
    <Modal isOpen={expenseModalOpen} closeModal={expenseModalClose}>
      <div className="payment-container">
        <h3 className="text-xl font-bold text-gray-800">Payment Status</h3>

        <div className="flex flex-col gap-4">
          <table className="mt-4 ">
            <tr className="w-full ">
              <td className="p-3 pl-0 font-bold">Friends</td>
              <td className="flex align-center justify-end p-3 pr-0 font-bold">
                Status
              </td>
            </tr>
            {memberDetails &&
              memberDetails.length > 0 &&
              memberDetails.map((mem, index) => (
                <tr className="border-b border-gray-100" key={index}>
                  <td className="p-3 pl-0">
                    <OwnerNameFetcher key={index} ownerId={mem.userId} />
                  </td>
                  <td className="flex align-center justify-end p-3 pr-0">
                    {mem.status === "approved" ? (
                      <p>Approved</p>
                    ) : (
                      <div>
                        {mem.status === "unapproved" &&
                        mem.paymentScreenshot ? (
                          <button
                            className="expense-view-button"
                            onClick={() => handleClick(mem.paymentScreenshot.url, mem.userId)}
                          >
                            View
                          </button>
                        ) : (
                          <p>Pending</p>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}

            {openViewModal && (
              <ExpenseApprovalOverlay
                viewModalOpen={openViewModal}
                viewModalClose={closeView}
                screenshot={paymentImage}
                expenseId = {expenseId}
                expenseUserId = {expenseUserId}
              />
            )}
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default ToReceiveExpenseOverlay;
