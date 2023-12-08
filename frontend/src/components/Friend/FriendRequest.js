import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { NotificationContext } from '../../context/NotificationProvider';
import { acceptFriendRequest, rejectFriendRequest } from '../../api/friend';
import { RefreshDataContext } from '../../context/RefreshDataProvider';

const FriendsRequest = ({ id: friendId, name, email, avatar }) => {
  const { updateNotification } = useContext(NotificationContext);
  const { authInfo } = useContext(AuthContext);
  const { handleRefresh } = useContext(RefreshDataContext);
  const userId = authInfo.profile?.id;

  const acceptRequest = async () => {
    const { error, message } = await acceptFriendRequest(userId, friendId);
    if (error) updateNotification('error', error);
    if (message) updateNotification('success', message);
    handleRefresh();
  };

  const rejectRequest = async () => {
    const { error, message } = await rejectFriendRequest(userId, friendId);
    if (error) updateNotification('error', error);
    if (message) updateNotification('warning', message);
    handleRefresh();
  };

  return (
    <div className='profile-friendRequest'>
      <div className='profile-avatar'>
        <img src={avatar} alt='profile-avatar' />
      </div>
      <div className='avatar-info'>
        <p>{name}</p>
        <span>{email}</span>

        <div className='decision-buttons mt-2'>
          <button
            onClick={acceptRequest}
            className='px-6 py-2 rounded-lg text-white transition-all duration-0 hover:duration-150 ease-in-out capitalize custom_primary_button text-sm'
          >
            <p className='button_text'>accept</p>
          </button>
          <button
            onClick={rejectRequest}
            className='px-6 py-2 rounded-lg  text-red-600  transition-all duration-0 hover:duration-150 ease-in-out capitalize custom_secondary_button text-sm'
          >
            <p className='button_text'>delete</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendsRequest;
