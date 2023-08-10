import React from 'react';

const FormSideDetails = () => {
  return (
    <div>
      <div className='hidden lg:flex lg:p-0 xl:p-10 side__border items-center flex-col'>
        <img src='/login.png' alt='online expense' />
        <h3 className='text-4xl text-blue-600 font-bold'>Mero Pay</h3>
        <p className='text-center max-w-[600px] mt-2'>
          Your seamless expense tracking companion for effortless financial
          management on-the-go.
        </p>
      </div>
    </div>
  );
};

export default FormSideDetails;
