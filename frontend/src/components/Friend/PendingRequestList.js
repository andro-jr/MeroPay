import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NotificationContext } from "../../context/NotificationProvider";
import { AuthContext } from "../../context/AuthProvider";
import { RefreshDataContext } from "../../context/RefreshDataProvider";
import { acceptFriendRequest, getAllFriends, rejectFriendRequest } from "../../api/friend";
import Loader from "../Loader";
import Loading from "../loader/Loading";

const PendingRequestList = ({ id: friendId, name, email, avatar }) => {
  const { updateNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);
  const { authInfo } = useContext(AuthContext);
  const { handleRefresh, refreshBool } = useContext(RefreshDataContext);
  const userId = authInfo.profile?.id;

  const acceptRequest = async () => {
    setLoading(true);
    const { error, message } = await acceptFriendRequest(userId, friendId);
    if (error) updateNotification("error", error);
    if (message) updateNotification("success", message);
    setLoading(false);
    handleRefresh();
  };

  const rejectRequest = async () => {
    setLoading(true);
    const { error, message } = await rejectFriendRequest(userId, friendId);
    if (error) updateNotification("error", error);
    if (message) updateNotification("warning", message);
    setLoading(false);
    handleRefresh();
  };

  const fetchAllFriends = async (userId) => {
    setLoading(true);
    const res = await getAllFriends(userId);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllFriends(userId);
  }, [refreshBool]);

  return (
    <div className="profile-friendRequest w-full">
      <div className="profile-avatar">
        <img src={avatar} alt="profile-avatar" />
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="info-container">
          <p>{name}</p>
          <span className="text-sm text-gray-500 tracking-normal">{email}</span>
        </div>

        <div className="flex items-center mt-2 gap-4">
          <button
            onClick={acceptRequest}
            className="px-6 py-2 rounded-lg text-white transition-all duration-0 hover:duration-150 ease-in-out capitalize custom_primary_button text-sm max-h-[40px]"
          >
            {/* {loading ? (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <p className="button_text">accept</p>
              )} */}
              <p className="button_text">accept</p>
          </button>
          <button
            onClick={rejectRequest}
            className="px-6 py-2 rounded-lg transition-all duration-0 hover:duration-150 ease-in-out capitalize custom_secondary_button text-sm "
          >
            {/* {loading ? (
              <div className="w-auto max-h-[40px] flex items-center justify-center object-contain object-center">
                <Loading />
              </div>
            ) : (
              <p className="button_text">delete</p>
              )} */}
              <p className="button_text">delete</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingRequestList;
