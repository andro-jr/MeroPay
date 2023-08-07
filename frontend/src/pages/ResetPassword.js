import React, { useContext, useEffect, useState } from "react";
import FormSideDetails from "../components/Form/FormSideDetails";
import FormInput from "../components/Form/FormInput";
import Button from "../components/Button";
import { NotificationContext } from "../context/NotificationProvider";

import { resetPassword, verifyPassResetToken } from "../api/auth";
import Loader from "../components/Loader";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState("");

  const [params] = useSearchParams();
  const token = params.get("token");
  const id = params.get("id");

  const verifyToken = async (token, id) => {
    const { valid, error } = await verifyPassResetToken(token, id);

    console.log(valid, error);

    setIsVerifying(false);
    if (error) {
      setIsValid(false);
      return updateNotification("error", error);
    }

    if (valid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    navigate("/auth/sign-in");
  };

  useEffect(() => {
    verifyToken(token, id);
  }, []);

  const { updateNotification } = useContext(NotificationContext);

  const [password, setPassword] = useState({
    one: "",
    two: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.one !== password.two)
      return updateNotification("error", "Passwords do not match");

    const passwordInfo = {
      newPassword: password.one,
      userId: id,
      token,
    };

    const { error, message } = await resetPassword(passwordInfo);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);

    navigate("/auth/sign-in", { replace: true });
  };

  if (isVerifying) {
    return (
      <div className="flex justify-center items-center flex-col h-[100vh] border-2">
        <Loader />
        <h3 className="text-4xl text-blue-600 font-bold mt-0 md:mt-10">
          Please Wait while we verify the token.
        </h3>
      </div>
    );
  }
  if (!isValid) {
    return (
      <div className="flex justify-center items-center flex-col h-[100vh] border-2">
        {/* <img src='/404.svg' alt='' width={400} height={400} /> */}
        <h3 className="text-7xl text-blue-600 font-extrabold ">
          Oops! Invalid Link
        </h3>
        <p className="text-md text-gray-600 font-medium mt-0 md:mt-10">
          The link you provided is not valid. Please check the URL and try again
        </p>
        <button
          className="px-8 py-3 rounded-md mt-8 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out w-[300px] capitalize custom_primary_button"
          onClick={handleClick}
        >
          <p className="button_text">back to sign in</p>
        </button>
      </div>
    );
  }
  if (isValid) {
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
                placeholder="********"
                type="password"
                name="one"
                label="New Password"
                value={password.one}
                onChange={handleChange}
              />
              <FormInput
                placeholder="********"
                type="password"
                name="two"
                label="Confirm Password"
                value={password.two}
                onChange={handleChange}
              />

              <Button
                title="Reset Password"
                styles="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default ResetPassword;
