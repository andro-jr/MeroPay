import React, { useContext, useEffect, useState } from "react";
import DashboardContainer from "../Dashboard/DashboardContainer";
import { MdGroup } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import FriendsProfile from "./FriendsProfile";
import FriendsRequest from "./FriendRequest";
import DashSubHead from "../DashSubHead";
import DashLink from "../DashLink";
import {
  getAllFriends,
  getPendingFriends,
  removeFriend,
} from "../../api/friend";
import { AuthContext } from "../../context/AuthProvider";
import { RefreshDataContext } from "../../context/RefreshDataProvider";
import FriendsListOverlay from "./FriendsListOverlay";
import Loader from "../Loader";
import PendingRequestOverlay from "./PendingRequestOverlay";
import NotificationProvider, {
  NotificationContext,
} from "../../context/NotificationProvider";

const FriendsList = () => {
  const { authInfo } = useContext(AuthContext);
  const userId = authInfo.profile?.id;
  const { handleRefresh, refreshBool } = useContext(RefreshDataContext);
  // notificaton provider
  //  const { updateNotification } = useContext(NotificationContext);

  const [isFriend, setIsFriend] = useState(true);

  //loading state
  const [loading, setLoading] = useState(false);

  // getting list of friends
  const [friends, setFriends] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);

  // checking if the modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);

  const fetchAllFriends = async (userId) => {
    setLoading(true);
    const res = await getAllFriends(userId);
    setFriends(res);
    setLoading(false);
  };

  const fetchPendingFriends = async (userId) => {
    setLoading(true);
    const res = await getPendingFriends(userId);
    setPendingFriends(res);
    setLoading(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPendingModal = () => {
    setIsPendingModalOpen(true);
  };

  const closePendingModal = () => {
    setIsPendingModalOpen(false);
  };

  useEffect(() => {
    fetchPendingFriends(userId);
    fetchAllFriends(userId);
  }, [refreshBool]);

  return (
    <div className='flex flex-col gap-4'>
      <DashboardContainer>
        <div className='border-b-2 pb-3 border-gray-100 flex justify-between items-baseline'>
          <DashSubHead>Friends</DashSubHead>
          <DashLink onClick={openModal}>view all</DashLink>

          {isModalOpen && (
            <FriendsListOverlay
              openModal={isModalOpen}
              closeModal={closeModal}
              // onClick = {removeFriends}
            />
          )}
        </div>

        <div className=''>
          {loading ? (
            <div className='flex items-center justify-center'>
              <Loader />
            </div>
          ) : (
            <div className='friends-list'>
              {friends.length > 0 ? (
                friends.map((friend, index) => {
                  if (index < 3) {
                    return (
                      <FriendsProfile
                        key={index}
                        avatar={friend.avatar}
                        name={friend.name}
                        email={friend.email}
                      />
                    );
                  }
                })
              ) : (
                <div className='text-sm text-gray-300 text-center'>
                  No friends yet, add new people
                </div>
              )}
            </div>
          )}
        </div>
      </DashboardContainer>

      <DashboardContainer>
        <div className='border-b-2 pb-3 border-gray-100 flex justify-between items-baseline'>
          <DashSubHead>Pending Requests</DashSubHead>
          <DashLink onClick={openPendingModal}>view all</DashLink>

          {isPendingModalOpen && (
            <PendingRequestOverlay
              pendingModalOpen={isPendingModalOpen}
              pendingModalClose={closePendingModal}
            />
          )}
        </div>
        <div className='request-container'>
          {pendingFriends.length > 0 ? (
            pendingFriends.map((friend, index) => {
              if (index < 2) {
                return (
                  <FriendsRequest
                    key={index}
                    id={friend.userId}
                    avatar={friend.avatar}
                    name={friend.name}
                    email={friend.email}
                  />
                );
              }
            })
          ) : (
            <div className='text-sm text-gray-300 text-center'>
              No pending requests
            </div>
          )}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default FriendsList;
