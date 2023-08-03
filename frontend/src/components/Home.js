import React from 'react';
import FormInput from './FormInput';
import Button from './Button';
import { Link } from 'react-router-dom';

const Home = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
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
                to='/register'
                className=' hover:text-blue-600 transition-all duration-0 hover:duration-50 ease-in-out hover:underline'
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
