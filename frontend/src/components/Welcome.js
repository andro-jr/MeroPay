import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { GrFormClose } from "react-icons/gr";

import ButtonSecondVariant from "./ButtonSecondVariant";

const Welcome = ({ trigger }) => {
  const { authInfo } = useContext(AuthContext);
  const username = authInfo.profile?.name;

  const [open, setOpen] = useState(trigger);

  const handleClick = (trigger) => {
    setOpen(!trigger);
  };

  const [width, setWidth] = useState(0);

  const changeWidth = () => {
    const width = username.length < 5 ? 50 : username.length * 7;
    setWidth(width);
    return width;
  };

  useEffect(() => {
    changeWidth();
  }, []);

  return (
    <div>
      {open ? (
        <div className="modal">
          <div className="overlay">
            <div className="p-5 bg-white rounded-xl mb-4 flex flex-col overlay-inner">
              <span className="close">
                <GrFormClose onClick={handleClick} />
              </span>
              <div className="text-3xl logo-text font-bold flex flex-col items-center justify-center">
                <p className="welcome-title__background-first">
                  Welcome to MeroPay
                </p>
                <span
                  className="welcome-title__background-second"
                  style={{ width: `${width}%` }}
                >
                  {username}
                </span>
              </div>

              <span className="p-4 welcome-text">
                Your go-to expense tracker! To get the most out of our app,
                start by adding your expenses. It's as simple as that. We're
                here to make your financial management a breeze. Happy tracking
                with MeroPay!
              </span>

              <ButtonSecondVariant title="add expense" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Welcome;
