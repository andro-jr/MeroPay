import React, { createContext, useState } from 'react';
export const LoaderContext = createContext();

const LoaderProvider = ({ children }) => {
  const [showLoader, setShowLoader] = useState(false);

  return (
    <LoaderContext.Provider value={{ setShowLoader }}>
      {showLoader && (
        <div className='fixed w-full h-screen backdrop-blur-md border-2 z-10'>
          <img src='/paper-plane.gif' alt='' className='h-full ' />
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
