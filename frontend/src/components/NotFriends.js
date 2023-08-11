import React, { useContext, useEffect, useState } from "react";
import { addFriend } from "../api/friend";
import { AuthContext } from "../context/AuthProvider";
import { NotificationContext } from "../context/NotificationProvider";

const NotFriends = ({ friendId, requestAlreadyReceived }) => {
  const [addNew, setAddNew] = useState("/add.svg");
  const [reqSent, setReqSent] = useState("");

  const { authInfo } = useContext(AuthContext);

  const userId = authInfo.profile?.id;

  const { updateNotification } = useContext(NotificationContext);

  console.log(requestAlreadyReceived);

  useEffect(() => {
    if (requestAlreadyReceived) {
      setAddNew("/sent.svg");
      setReqSent("Request Sent");
    }
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!requestAlreadyReceived) {
      const { user, error, message } = await addFriend(friendId, userId);
      console.log(user);
      setAddNew("/sent.svg");

      updateNotification("success", message);
      setReqSent("Request Sent");
    } else {
      setAddNew("/add.svg");

      setReqSent("Request Cancelled");
      setInterval(() => {
        setReqSent("");
      }, 1000);
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
