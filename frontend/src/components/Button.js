import React from 'react';

const Button = ({ title, styles }) => {
  return (
    <button
      className={`px-8 py-3 rounded-md w-full mt-8 ${styles} custom_primary_button`}
    >
      <div className='button_text'>{title}</div>
    </button>
  );
};

export default Button;
