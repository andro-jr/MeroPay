import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { ownerDetail } from "../../api/details";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { TabContext } from "../../context/TabProvider";
import { NotificationContext } from "../../context/NotificationProvider";
import { LoaderContext } from "../../context/LoaderProvider";
import { updateExpense } from "../../api/expense";

const ToPayExpenseOverlay = ({
  expenseModalOpen,
  expenseModalClose,
  ownerId,
  expenseId,
  children,
}) => {
  // console.log(expenseId);
  const [ownerName, setOwnerName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { setTabIndex } = useContext(TabContext);

  const navigate = useNavigate();

  const { authInfo, avatar, isAuth } = useContext(AuthContext);
  const userId = authInfo.profile?.id;

  const [fileUrl, setFileUrl] = useState();
  const [file, setFile] = useState();

  const { updateNotification } = useContext(NotificationContext);
  const { setShowLoader } = useContext(LoaderContext);

  const getOwnerDetails = async () => {
    try {
      const data = await ownerDetail(ownerId);
      const { name } = data;
      const { url } = data.paymentQR;
      setImageUrl(url);
      setOwnerName(name);
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log("expenseId", expenseId, "userId", userId, "file", file);
  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const validator = () => {
    if (!expenseId) return { ok: false, err: "expensId is missing" };
    if (!userId) return { ok: false, err: "userId is missing" };
    if (!file) return { ok: false, err: "file is missing" };

    return { ok: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { ok, err } = validator(expenseId, userId, file);
    if (err) return updateNotification("error", err);

    const formData = new FormData();

    setShowLoader(true);

    formData.append("expenseId", expenseId);
    formData.append("userId", userId);
    formData.append("screenshot", file);

    const { error, message } = await updateExpense(formData);

    setShowLoader(false);
    if (error) return updateNotification("error", error);
    setShowLoader(false);
    updateNotification("success", message);

    expenseModalClose();
    setTabIndex(0);
    navigate("/");
    isAuth();
  };

  useEffect(() => {
    getOwnerDetails();
  }, []);

  return (
    <Modal isOpen={expenseModalOpen} closeModal={expenseModalClose}>
      <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col items-center justify-center text-3xl font-bold mb-12">
          <h3 className="mb-12">
            <span className="3xl capitalize">{ownerName}</span>'s QR
          </h3>
          <div className="flex flex-col-items-center justify-center paymentQR_image p-8 ">
            <img
              src={imageUrl}
              alt={ownerName}
              className="w-[200px] h-[200px] pointer-events-none"
            />
          </div>
        </div>

        <div className="flex flex-col pl-6 pr-6 items-start justify-center mb-12">
          <h4 className="font-bold mb-2">Instructions</h4>
          <p className="font-medium text-md text-center">
            1. Scan the QR Code and pay
          </p>
          <p className="font-medium text-md text-center">
            2. Attach the receipt of the payment
          </p>
        </div>

        <label htmlFor="paymentQr" className="cursor-pointer">
          {file ? (
            <div className="paymentQR_image !w-auto !h-auto">
              <img src={fileUrl} alt="" />
              <div className="updateOption">
                <img src="/upload.png" alt="" />
                <h4 className="mt-5 font-semibold tracking-wide text-center">
                  Update Payment Receipt
                </h4>
              </div>
            </div>
          ) : (
            <div className="QR_label">
              <img src="/upload.png" alt="" />
              <h4 className="mt-5 font-semibold tracking-wide text-center">
                Upload Your Payment Receipt
              </h4>
            </div>
          )}
        </label>

        <input
          type="file"
          id="paymentQr"
          name="fileInput"
          accept=".jpg, .jpeg, .png"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex justify-center items-center gap-5 mt-10">
          <button
            type="submit"
            className="px-8 py-3 rounded  text-white  transition-all duration-0 hover:duration-150 ease-in-out capitalize custom_primary_button"
          >
            <p className="button_text">Submit</p>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ToPayExpenseOverlay;
