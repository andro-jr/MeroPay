import React, { useContext, useEffect, useState } from 'react';
import DashboardContainer from './DashboardContainer';
import { MdGroup } from 'react-icons/md';
import { IoPersonAdd } from 'react-icons/io5';
import FriendsProfile from './FriendsProfile';
import FriendsRequest from './FriendRequest';
import DashSubHead from './DashSubHead';
import DashLink from './DashLink';
import { getAllFriends, getPendingFriends } from '../api/friend';
import { AuthContext } from '../context/AuthProvider';
import { RefreshDataContext } from '../context/RefreshDataProvider';

const FriendsList = () => {
  const { authInfo } = useContext(AuthContext);
  const userId = authInfo.profile?.id;
  const { handleRefresh, refreshBool } = useContext(RefreshDataContext);

  const [friends, setFriends] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);

  const fetchAllFriends = async (userId) => {
    const res = await getAllFriends(userId);
    setFriends(res);
  };
  
  const fetchPendingFriends = async (userId) => {
    const res = await getPendingFriends(userId);
    setPendingFriends(res);
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
          <DashLink>view all</DashLink>
        </div>

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
              You introvert have no friends
            </div>
          )}
        </div>
      </DashboardContainer>

      <DashboardContainer>
        <div className='border-b-2 pb-3 border-gray-100 flex justify-between items-baseline'>
          <DashSubHead>Pending Requests</DashSubHead>
          <DashLink>view all</DashLink>
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
              No one likes you
            </div>
          )}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default FriendsList;
