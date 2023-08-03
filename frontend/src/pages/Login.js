import React, { useContext, useState } from 'react';
import FormInput from '../components/Form/FormInput';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import FormSideDetails from '../components/Form/FormSideDetails';
import { AuthContext } from '../context/AuthProvider';

const Home = () => {
  const { authInfo, handleLogin } = useContext(AuthContext);
  console.log(authInfo);

  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  // console.log(inputData)

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: inputData.email,
      password: inputData.password,
    };

    handleLogin(payload.email, payload.password);

    console.log(payload);
  };

  return (
    <div className='flex w-screen h-screen items-center justify-center'>
      <div className='container max-w-[1200px] m-auto login min-h-[70vh]'>
        <FormSideDetails />

        <div className='flex flex-col items-center my-auto pl-20'>
          <h3 className='text-4xl text-blue-600 font-bold mt-0 md:mt-10'>
            Log in to Mero Pay
          </h3>
          <p className='mb-8 mt-4 max-w-[400px] text-center'>
            Welcome to Mero Pay. Your complete expense Tracker
          </p>
          <form onSubmit={handleSubmit}>
            <FormInput
              placeholder='abc@example.com'
              type='text'
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
                to='/signup'
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
