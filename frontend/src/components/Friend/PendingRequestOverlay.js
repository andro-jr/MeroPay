import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { RefreshDataContext } from "../../context/RefreshDataProvider";
import { getPendingFriends } from "../../api/friend";
import { AuthContext } from "../../context/AuthProvider";
import FriendsProfile from "./FriendsProfile";
import Loader from "../Loader";
import PendingRequestList from "./PendingRequestList";

const PendingRequestOverlay = ({
  pendingModalOpen,
  pendingModalClose,
  children,
}) => {
  const [pendingRequest, setPendingRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authInfo } = useContext(AuthContext);
  const userId = authInfo.profile?.id;
  const { handleRefresh, refreshBool } = useContext(RefreshDataContext);

  const fetchPendingRequest = async (userId) => {
    setLoading(true);
    const res = await getPendingFriends(userId);
    setPendingRequest(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingRequest(userId);
  }, [refreshBool]);

  return (
    <Modal isOpen={pendingModalOpen} closeModal={pendingModalClose}>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Pending Requests
      </h2>
      <ul>
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div>
            {pendingRequest.length > 0 ? (
              <div>
                {pendingRequest.map((friend, index) => (
                  <li
                    key={index}
                    className=" flex justify-between w-full p-4 pl-0 items-center border-b border-gray-100"
                  >
                    <PendingRequestList
                       key={index}
                       id={friend.userId}
                       avatar={friend.avatar}
                       name={friend.name}
                       email={friend.email}
                    />
                    {/* <button onClick={() => {}}>Unfriend</button> */}
                  </li>
                ))}
              </div>
            ) : (
              "No pending requests"
            )}
          </div>
        )}
      </ul>
    </Modal>
  );
};

export default PendingRequestOverlay;
