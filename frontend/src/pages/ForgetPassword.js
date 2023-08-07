import React, { useContext, useState } from "react";
import FormSideDetails from "../components/Form/FormSideDetails";
import FormInput from "../components/Form/FormInput";
import Button from "../components/Button";
import { NotificationContext } from "../context/NotificationProvider";
import { isValidEmail } from "../utils/helper";
import { forgetPassword } from "../api/auth";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const { updateNotification } = useContext(NotificationContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setEmail(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email))
      return updateNotification("error", "Enter a valid email Address");

    const { error, message } = await forgetPassword(email);

    if (error) return updateNotification("error", error);

    updateNotification("success", message);

    setEmail("");
    navigate("/auth/sign-in");
  };
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="container max-w-[1200px] m-auto login min-h-[70vh]">
        <FormSideDetails />
        <div className="flex flex-col items-center my-auto pl-20">
          <h3 className="text-4xl text-blue-600 font-bold mt-0 md:mt-10">
            Forgot Password?
          </h3>
          <p className="mb-8 mt-4 max-w-[400px] text-center">
            Enter your email address to get password reset link !
          </p>
          <form onSubmit={handleSubmit}>
            <FormInput
              placeholder="abc@example.com"
              type="text"
              name="email"
              onChange={handleChange}
            />

            <Button
              title="Send Reset Link"
              styles="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
