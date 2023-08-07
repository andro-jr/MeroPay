<<<<<<< HEAD
import FormSideDetails from "../components/Form/FormSideDetails";
import FormInput from "../components/Form/FormInput";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { signUpUser } from "../api/auth";
import { NotificationContext } from "../context/NotificationProvider";
import { AuthContext } from "../context/AuthProvider";
=======
import FormSideDetails from '../components/Form/FormSideDetails';
import FormInput from '../components/Form/FormInput';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
>>>>>>> e99dbd2f921679cf3e712af1a42c73ffe2496a9c

const Signup = () => {
  const navigate = useNavigate();
  // const [id, setId] = useState("");
  const { updateNotification } = useContext(NotificationContext);

  const { authInfo } = useContext(AuthContext);
  const { isLoggedIn } = authInfo;

  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // console.log(inputData);

  const handleChange = (e) => {
    e.preventDefault();

    const { value, name } = e.target;
    // console.log(value, name);
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: inputData.username,
      email: inputData.email,
      password: inputData.password,
    };

    const { error, user } = await signUpUser(payload);
    if (error) return updateNotification("error", error);

    console.log(user);

    navigate("/auth/OtpVerification", {
      state: {
        userId: user.id,
      },
    });

    // console.log(payload);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <div className='flex w-screen h-screen items-center justify-center overflow-hidden'>
      <div className='container max-w-[1300px] m-auto login min-h-[70vh]'>
        <FormSideDetails />

        <div className='flex flex-col items-center my-auto p-0 lg:p-5 2xl:p-20 pr-0  overflow-y-auto overflow-x-hidden'>
          <h3 className='text-4xl text-blue-600 font-bold mt-0 md:mt-0'>
            Sign Up
          </h3>
          <p className='my-8 mt-4 max-w-[350px] lg:max-w-[400px] text-center'>
            Signup for Mero Pay. Your complete expense Tracker
          </p>
<<<<<<< HEAD
          <form onSubmit={handleSubmit}>
=======
          <form onSubmit={handleSubmit} className='w-11/12  p-4 md:p-0'>
>>>>>>> e99dbd2f921679cf3e712af1a42c73ffe2496a9c
            <FormInput
              placeholder='lamaleon213'
              type='text'
              name='username'
              value={inputData}
              onChange={handleChange}
            />
            <FormInput
              placeholder='abc@example.com'
              type='email'
              name='email'
              value={inputData}
              onChange={handleChange}
            />
            <FormInput
              placeholder='************'
              type='password'
              name='password'
              value={inputData}
              onChange={handleChange}
            />

            <Button
              title='Sign Up'
              styles='bg-blue-600 text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out'
            />

            {/* <span>
              New to MeroPay?<Link to="/register">Create Account</Link>
            </span> */}
            <span className='text-sm text-gray-400 flex gap-2 mt-8 text-center items-center justify-center'>
              <p>Already have an account?</p>
              <Link
                to='/auth/sign-in'
                className=' hover:text-blue-600 transition-all duration-0 hover:duration-50 ease-in-out hover:underline'
              >
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
