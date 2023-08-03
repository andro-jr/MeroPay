<<<<<<< HEAD:frontend/src/components/Home.js
import React from 'react';
import FormInput from './FormInput';
import Button from './Button';
import { Link } from 'react-router-dom';
=======
import React, { useState } from "react";
import FormInput from "../components/Form/FormInput";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import FormSideDetails from "../components/Form/FormSideDetails";
>>>>>>> 47f4f516551aed767b528290aab6dfe2baec3a83:frontend/src/pages/Login.js

const Home = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  // console.log(inputData)

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD:frontend/src/components/Home.js
    console.log('submitted');
  };

  return (
    <div className='flex w-screen h-screen items-center justify-center'>
      <div className='container max-w-[1200px] m-auto login min-h-[70vh]'>
        <div className='flex border-r border-gray-200 items-center flex-col'>
          <img src='/login.png' alt='online expense' />
          <h3 className='text-4xl text-blue-600 font-bold'>Mero Pay</h3>
          <p className='text-center max-w-[600px] mt-2'>
            Your seamless expense tracking companion for effortless financial
            management on-the-go.
          </p>
        </div>
        <div className='flex flex-col items-center my-auto'>
          <h3 className='text-4xl text-blue-600 font-bold mt-10'>Mero Pay</h3>
          <p className='my-8 max-w-[400px] text-center'>
            Welcome to Mero Pay. Your complete expense Tracker
          </p>
          <form onSubmit={handleSubmit}>
            <FormInput placeholder='abc@example.com' type='text' name='email' />
            <FormInput
              placeholder='************'
              type='password'
              name='password'
=======

    const payload = {
      email: inputData.email,
      password: inputData.password,
    };

    console.log(payload);
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="container max-w-[1200px] m-auto login min-h-[70vh]">
        <FormSideDetails />

        <div className="flex flex-col items-center my-auto pl-20">
          <h3 className="text-4xl text-blue-600 font-bold mt-0 md:mt-10">
            Log in to Mero Pay
          </h3>
          <p className="mb-8 mt-4 max-w-[400px] text-center">
            Welcome to Mero Pay. Your complete expense Tracker
          </p>
          <form onSubmit={handleSubmit}>
            <FormInput
              placeholder="abc@example.com"
              type="text"
              name="email"
              value={inputData}
              onChange={handleChange}
            />
            <FormInput
              placeholder="************"
              type="password"
              name="password"
              value={inputData}
              onChange={handleChange}
>>>>>>> 47f4f516551aed767b528290aab6dfe2baec3a83:frontend/src/pages/Login.js
            />
            <span className='text-sm first-letter text-gray-400 hover:text-blue-600 transition-all duration-0 hover:duration-50 ease-in-out hover:underline'>
              <Link to='/forgot-password'>Forgot password?</Link>
            </span>
            <Button
              title='Login'
              styles='bg-blue-600 text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out'
            />

            {/* <span>
              New to MeroPay?<Link to="/register">Create Account</Link>
            </span> */}
            <span className='text-sm text-gray-400 flex gap-2 mt-14 text-center items-center justify-center'>
              <p>New to MeroPay?</p>
              <Link
<<<<<<< HEAD:frontend/src/components/Home.js
                to='/register'
                className=' hover:text-blue-600 transition-all duration-0 hover:duration-50 ease-in-out hover:underline'
=======
                to="/signup"
                className=" hover:text-blue-600 transition-all duration-0 hover:duration-50 ease-in-out hover:underline"
>>>>>>> 47f4f516551aed767b528290aab6dfe2baec3a83:frontend/src/pages/Login.js
              >
                Create Account
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
