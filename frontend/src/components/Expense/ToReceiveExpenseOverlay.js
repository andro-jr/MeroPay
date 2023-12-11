import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { ownerDetail } from "../../api/details";
import { singleExpenseDetail } from "../../api/expense";
import OwnerNameFetcher from "./OwnerNameFetcher";

const ToReceiveExpenseOverlay = ({
  expenseModalOpen,
  expenseModalClose,
  ownerId,
  expenseId,
}) => {
  const [memberDetails, setMemberDetails] = useState([]);
  console.log(memberDetails);
  const expenseDetail = async () => {
    try {
      const data = await singleExpenseDetail(expenseId);
      console.log(data);
      const { members } = data;

      setMemberDetails(members);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    expenseDetail();
  }, []);

  return (
    <Modal isOpen={expenseModalOpen} closeModal={expenseModalClose}>
      <div className="payment-container">
        <h3 className="text-xl font-bold text-gray-800">Payment Status</h3>

        {/* <OwnerNameFetcher ownerId="6572b6553e9ae3d765d2e9e7" /> */}
        <div className="flex flex-col gap-4">
          {/* {memberDetails && memberDetails.length > 0
            ? memberDetails.map((mem, index) => {
                <OwnerNameFetcher ownerId={mem.userId} />;
              })
            : "check "} */}
            <table className="mt-4">
                <tr className="mb-4  border-1 border-b-gray-700">
                    <td>Prabin</td>
                    <td className="flex align-center justify-end">Pending</td>
                </tr>
                <tr className=" mt-4 border-1 border-b-gray-700">
                    <td>Leon</td>
                    <td className="flex align-center justify-end"><button className="expense-pay-button">view</button></td>
                </tr>

                <tr className=" mt-4 border-1 border-b-gray-700">
                    <td>Leon</td>
                    <td className="flex align-center justify-end"><button className="expense-pay-button">view</button></td>
                </tr>
            </table>
        </div>
      </div>
    </Modal>
  );
};

export default ToReceiveExpenseOverlay;
