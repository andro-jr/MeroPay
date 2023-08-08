import React, { useContext } from "react";
import "../index.css";
// import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { NotificationContext } from "../context/NotificationProvider";
import { resendEmailVerificationToken } from "../api/auth";

const VerifyUser = () => {
  const { authInfo } = useContext(AuthContext);
  const { updateNotification } = useContext(NotificationContext);
  // const { isLoggedIn } = authInfo;
  // const isVerified = authInfo.profile?.isVerified;
  const id = authInfo.profile?.id;

  const navigate = useNavigate();

  const sendOtp = async (e) => {
    console.log("entered here");
    const payload = {
      userId: id, 
    };
    console.log(payload);
    console.log("entered here too");

    const { error, user, message } = await resendEmailVerificationToken(payload);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    navigate("/auth/OtpVerification", {
      state: {
        userId: id,
      },
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    sendOtp();
  };

  return (
    <div className="flex justify-center items-center flex-col h-[100vh] border-2">
      <img src="/4041.png" alt="" width={500} height={500} />
      <div className="border-t border-t-gray-600 mt-10 w-2/5 flex flex-col items-center justify-center">
        <h3 className="text-2xl text-gray-600 font-medium mt-5 text-center">
          Oops! User not verified
        </h3>
        <p className="text-center text-sm mt-3 max-w-[500px]">
          Looks Like Your account is not verified. Please verify your account to
          proceed.
        </p>
        <button
          className="px-8 py-3 rounded-md custom_primary_button mt-8 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out w-[300px] capitalize"
          onClick={handleClick}
        >
          <p className="button_text">Verify User</p>
        </button>
      </div>
    </div>
  );
};

export default VerifyUser;
