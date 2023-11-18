import React, { useContext, useEffect, useState } from "react";
import FormInput from "../components/Form/FormInput";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import FormSideDetails from "../components/Form/FormSideDetails";
import { AuthContext } from "../context/AuthProvider";
import { NotificationContext } from "../context/NotificationProvider";
import Container from "../components/Container";

const Login = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const { authInfo, handleLogin, isPending } = useContext(AuthContext);
  const { isLoggedIn } = authInfo;

  const pending = authInfo.isPending;

  const { updateNotification } = useContext(NotificationContext);

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const validateUserInput = (userInput) => {
    const { email, password } = userInput;
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.trim()) return { ok: false, err: "Email is missing" };
    if (!isValidEmail.test(email))
      return { ok: false, err: "Email is invalid" };

    return { ok: true };
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { ok, err } = validateUserInput(inputData);

    if (err) return updateNotification("error", err);

    const payload = {
      email: inputData.email,
      password: inputData.password,
    };

    // localStorage.setItem('firstLogin', 'true');
    setLoggedIn(true);
    handleLogin(payload.email, payload.password);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <Container>
      {pending && (
        <div className="fixed w-full h-screen backdrop-blur-md border-2 z-10">
          <img src="/paper-plane.gif" alt="" className="h-full " />
        </div>
      )}
      <div className="container max-w-[1200px] m-auto login min-h-[70vh]">
        <FormSideDetails />

        <div className="flex flex-col items-center my-auto pl:0 xl:pl-20">
          <h3 className="text-4xl text-blue-500 font-bold mt-0 md:mt-10">
            Log in to Mero Pay
          </h3>
          <p className="mb-8 mt-4 max-w-[350px] text-center">
            Welcome to Mero Pay. Your complete expense Tracker
          </p>
          <form onSubmit={handleSubmit}>
            <FormInput
              placeholder="abc@example.com"
              type="text"
              name="email"
              value={inputData.email}
              onChange={handleChange}
            />
            <FormInput
              placeholder="************"
              type="password"
              name="password"
              value={inputData.password}
              onChange={handleChange}
            />

            <span className="text-sm first-letter text-gray-400 hover:text-red-400 transition-all duration-0 hover:duration-50 ease-in-out hover:underline">
              <Link to="/auth/forget-password">Forgot password?</Link>
            </span>
            <Button
              title="Login"
              styles="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
            />

            {/* <span>
              New to MeroPay?<Link to="/register">Create Account</Link>
            </span> */}
            <span className="text-sm text-gray-400 flex gap-2 mt-14 text-center items-center justify-center">
              <p>New to MeroPay?</p>
              <Link
                to="/auth/signup"
                className=" hover:text-red-600 transition-all duration-0 hover:duration-50 ease-in-out hover:underline"
              >
                Create Account
              </Link>
            </span>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
