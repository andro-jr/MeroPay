import React from "react";

const AlreadyFriendsResult = () => {
  return (
    <div className=" flex gap-3 items-center text-sm text-gray-400">
      <p>friends</p>
      <div className="friends">
        <img src="/friends.svg" alt="" className="add" onClick={() => {}} />
      </div>
    </div>
  );
};

export default AlreadyFriendsResult;
