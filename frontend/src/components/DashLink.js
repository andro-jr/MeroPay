import React from 'react';
import { Link } from 'react-router-dom';

const DashLink = ({ children, to }) => {
  return (
    <Link
      to={to}
      className='uppercase tracking-wider text-blue-500 text-xs font-semibold hover:underline'
    >
      {children}
    </Link>
  );
};

export default DashLink;
