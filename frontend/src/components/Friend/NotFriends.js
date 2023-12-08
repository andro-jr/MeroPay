import React, { useContext, useEffect, useState } from "react";
import { addFriend, cancelFriendRequest } from "../../api/friend";
import { AuthContext } from "../../context/AuthProvider";
import { NotificationContext } from "../../context/NotificationProvider";
import { RefreshDataContext } from "../../context/RefreshDataProvider";

const NotFriends = ({ friendId, requestAlreadyReceived }) => {
  const [addNew, setAddNew] = useState("/add.svg");
  const [reqSent, setReqSent] = useState("");
  const { handleRefresh } = useContext(RefreshDataContext);
  const { authInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [reqAlreadyReceived, setReqAlreadyReceived] = useState(
    requestAlreadyReceived
  );

  const userId = authInfo.profile?.id;

  const { updateNotification } = useContext(NotificationContext);

  console.log(requestAlreadyReceived);

  const addFriends = async (userId, friendId) => {
    const { user, error, message } = await addFriend(friendId, userId);
    if (error) return updateNotification("error", error);
    updatestatus(message);
  };

  // to cancel the request if already send before
  const cancelRequest = async (userId, friendId) => {
    setLoading(true);
    const { error, message } = await cancelFriendRequest(userId, friendId);
    if (error) {
      updateNotification("error", error);
    } else {
      setAddNew("/add.svg");
      setReqSent("Request Cancelled");
      setReqAlreadyReceived(false);
      updateNotification("success", message);
      handleRefresh();
      setInterval(() => {
        setReqSent("");
      }, 1000);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (requestAlreadyReceived) {
      setAddNew("/sent.svg");
      setReqSent("Request Sent");
    }
  }, [reqAlreadyReceived]);

  const updatestatus = (message) => {
    setAddNew("/sent.svg");
    updateNotification("success", message);
    setReqSent("Request Sent");
    setReqAlreadyReceived(true);
  };


  const handleClick = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (reqAlreadyReceived === false) {
      await addFriends(userId, friendId);
    } else {
      await cancelRequest(userId, friendId);
    }

    setLoading(false);
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
