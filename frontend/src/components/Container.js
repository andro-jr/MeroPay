import React from "react";

const Container = ({ children }, classes) => {
  return (
    <div className={`flex w-screen h-screen items-center justify-center overflow-hidden ${classes}`}>
      {children}
    </div>
  );
};

export default Container;
