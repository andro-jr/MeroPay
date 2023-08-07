import React, { useContext, useEffect } from "react";
import FormSideDetails from "../components/Form/FormSideDetails";
import FormInput from "../components/Form/FormInput";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { emailVerification } from "../api/auth";
import { AuthContext } from "../context/AuthProvider";
import { NotificationContext } from "../context/NotificationProvider";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateNotification } = useContext(NotificationContext);
  const { authInfo, isAuth } = useContext(AuthContext);
  const { isLoggedIn } = authInfo;

  console.log(location.state);

  const [otp, setOtp] = useState();

  // console.log(inputData);

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    // console.log(value, name);
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      otp,
      userId: location.state.userId,
    };

    const { error, user, message } = await emailVerification(payload);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    localStorage.setItem("auth-token", user.token);

    isAuth();
  };

  useEffect(() => {
    if (!location.state?.userId) navigate("/auth/sign-in");

    if (isLoggedIn) navigate("/");
  }, [isLoggedIn])
;

  return (
    <div className="flex w-screen h-screen items-center justify-center overflow-hidden">
      <div className="container max-w-[1300px] m-auto login min-h-[70vh]">
        <FormSideDetails />

        <div className="flex flex-col items-center xl:items-start my-auto p-0 lg:p-5 2xl:p-20 pr-0  overflow-y-auto overflow-x-hidden">
          <h3 className="text-4xl text-blue-600 font-bold mt-0 md:mt-0">
            Enter Your OTP
          </h3>
          <p className="my-8 mt-4 max-w-[350px] lg:max-w-[400px] text-center">
            OTP has been sent to your mail
          </p>
          <form onSubmit={handleSubmit}>
            <FormInput
              placeholder="XXXXXX"
              type="text"
              name="Enter OTP"
              value={otp}
              onChange={handleChange}
            />

            <Button
              title="Submit OTP"
              styles="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
