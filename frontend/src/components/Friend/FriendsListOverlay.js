import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { RefreshDataContext } from "../../context/RefreshDataProvider";
import { getAllFriends, removeFriend } from "../../api/friend";
import { AuthContext } from "../../context/AuthProvider";
import FriendsProfile from "./FriendsProfile";
import Loader from "../Loader";
import { NotificationContext } from "../../context/NotificationProvider";

const FriendsListOverlay = ({
  isModalOpen,
  closeModal,
  // removeFriends,
  children,
}) => {
  const [friendId, setFriendId] = useState(null);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authInfo } = useContext(AuthContext);
  const userId = authInfo.profile?.id;
  const { handleRefresh, refreshBool } = useContext(RefreshDataContext);
  // notificaton provider
  const { updateNotification } = useContext(NotificationContext);

  const fetchAllFriends = async (userId) => {
    setLoading(true);
    const res = await getAllFriends(userId);
    setFriends(res);
    setLoading(false);
  };

  // console.log(friends);

  const unfriend = async (userId, friendId) => {
    setLoading(true);
    const { error, message } = await removeFriend(userId, friendId);
    // setPendingFriends(res);
    if (error) updateNotification("error", error);
    if (message) updateNotification("success", message);
    handleRefresh();
    setLoading(false);
  };

  const removeFriends = (friendId) => {
    setLoading(true);
    unfriend(userId, friendId);
    setFriendId(friendId);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllFriends(userId);
  }, [refreshBool]);

  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <h2 className="text-2xl font-bold text-gray-700 mb-8">
        Your Friends List
      </h2>
      <ul>
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div>
            {friends.length > 0 ? (
              <div>
                {friends.map((friend, index) => (
                  <li
                    key={index}
                    className=" flex justify-between w-full p-4 pl-0 items-center border-b border-gray-100"
                  >
                    <FriendsProfile
                      avatar={friend.avatar}
                      name={friend.name}
                      email={friend.email}
                    />
                    {/* <button onClick={() => {}}>Unfriend</button> */}

                    <div className="friends">
                      <img
                        src="/unfriend.svg"
                        alt="remove friend"
                        className="add small"
                        sizes={15}
                        onClick={() => removeFriends(friend.userId)}
                      />
                      {/* <p  onClick={() => removeFriends(friend.userId)} className="text-black font-bold">remove</p> */}
                    </div>
                  </li>
                ))}
              </div>
            ) : (
              "No friends to show, add more people"
            )}
          </div>
        )}
      </ul>
    </Modal>
  );
};

export default FriendsListOverlay;
