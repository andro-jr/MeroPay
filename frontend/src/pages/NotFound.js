import React from 'react';
import '../index.css';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();

    navigate('/');
  };

  return (
    <div className='flex justify-center items-center flex-col h-[100vh] border-2'>
      <img src='/4041.png' alt='' width={500} height={500} />
      <div className='floating-object-1'></div>
      <div className='floating-object-2'></div>
      <div className=' mt-10 w-2/5 flex flex-col items-center justify-center'>
        <h3 className='text-2xl text-gray-600 font-medium mt-5 text-center'>
          Oops! page not found
        </h3>
        <p className='text-center text-sm mt-3 max-w-[500px]'>
          We've reached the space, still could not find the page you're looking
          for.
        </p>
        <button
          className='px-8 py-3 rounded-md custom_primary_button mt-8 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out capitalize'
          onClick={handleClick}
        >
          <p className='button_text'>back to home</p>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
