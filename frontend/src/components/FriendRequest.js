import React from 'react';
import { Link } from 'react-router-dom';

const FriendsRequest = ({ name, email, avatar }) => {
  return (
    <div className='profile-friendRequest'>
      <div className='profile-avatar'>
        <img src='/avatar.jpg' alt='profile-avatar' />
      </div>
      <div className='avatar-info'>
        <p>{name}</p>
        <span>{email}</span>

        <div className='decision-buttons'>
          <button className='px-6 py-2 rounded-lg text-white transition-all duration-0 hover:duration-150 ease-in-out capitalize custom_primary_button text-sm'>
            <p className='button_text'>accept</p>
          </button>
          <button className='px-6 py-2 rounded-lg  text-red-600  transition-all duration-0 hover:duration-150 ease-in-out capitalize custom_secondary_button text-sm'>
            <p className='button_text'>delete</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendsRequest;
