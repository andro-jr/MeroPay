import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { RefreshDataContext } from "../../context/RefreshDataProvider";
import { getAllFriends } from "../../api/friend";
import { AuthContext } from "../../context/AuthProvider";
import FriendsProfile from "./FriendsProfile";
import Loader from "../Loader";

const FriendsListOverlay = ({ isModalOpen, closeModal, children }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authInfo } = useContext(AuthContext);
  const userId = authInfo.profile?.id;
  const { handleRefresh, refreshBool } = useContext(RefreshDataContext);

  const fetchAllFriends = async (userId) => {
    setLoading(true);
    const res = await getAllFriends(userId);
    setFriends(res);
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
            {friends.map((friend, index) => (
              <li
                key={index}
                className=" flex justify-between w-full p-4 items-center border-b border-gray-100"
              >
                <FriendsProfile
                  avatar={friend.avatar}
                  name={friend.name}
                  email={friend.email}
                />
                {/* <button onClick={() => {}}>Unfriend</button> */}

                <div className="friends">
                  <img
                    src="/friends.svg"
                    alt=""
                    className="add small"
                    sizes={15}
                    onClick={() => {}}
                  />
                </div>
              </li>
            ))}
          </div>
        )}
      </ul>
    </Modal>
  );
};

export default FriendsListOverlay;
