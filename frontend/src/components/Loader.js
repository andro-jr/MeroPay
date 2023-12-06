import React from 'react';

const Loader = ({sizee}) => {
  return (
    <div className={`lds-ring object-contain object-center ${sizee} `}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
