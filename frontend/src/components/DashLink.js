import React from 'react';
import { Link } from 'react-router-dom';

const DashLink = ({ onClick, children, to }) => {
  const handleClick = (event) => {
    // Call the provided onClick function if available
    if (onClick) {
      onClick();
    }

    // Prevent the default navigation behavior
    event.preventDefault();
  };

  return (
    <Link
      to={to}
      className='uppercase tracking-wider text-blue-500 text-xs font-semibold hover:underline'
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default DashLink;