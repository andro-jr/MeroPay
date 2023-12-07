import React from 'react';
import { Link } from 'react-router-dom';

const FriendsProfile = ({ name, email, avatar }) => {
  // console.log(avatar);
  return (
    <div className='profile-friend'>
      <div className='profile-avatar'>
        {/* <img src={avatar ? `${avatar}` : `/placeholder.jpg` } alt='profile-avatar' /> */}
        <img src={avatar ?? "/placeholder.jpg"} alt='profile-avatar' />
      </div>
      <div className='avatar-info'>
        <p>{name}</p>
        <span>{email}</span>
      </div>
    </div>
  );
};

export default FriendsProfile;
