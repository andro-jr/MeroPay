import React, { useEffect, useState } from "react";

const NotFriends = () => {
  const [addNew, setAddNew] = useState("/add.svg");
  const [reqSent, setReqSent] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    if (addNew === "/add.svg") {
      setAddNew("/sent.svg");
      setReqSent("Request Sent")
    } else {
      setAddNew("/add.svg");
      setReqSent("");
    }
  };
  return (
    <div className=" flex gap-6 items-center">
        <p className="text-sm text-gray-400">{reqSent}</p>
      <div className="add-friend">
        <img
          src={addNew}
          alt=""
          className="add transition-all duration-400"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default NotFriends;
