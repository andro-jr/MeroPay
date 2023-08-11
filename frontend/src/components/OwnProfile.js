import React from 'react';
import { Link } from 'react-router-dom';

const Profile = ({ name, email, avatar }) => {
  return (
    <div className='profile'>
      <div className='profile-avatar'>
        <Link to='/'>
          <img src={avatar} alt='profile-avatar' />
        </Link>
      </div>
      <div className='avatar-info'>
        <p>
          <Link to='/'>{name}</Link>
        </p>
        <span>
          <Link to='/'>{email}</Link>
        </span>
      </div>
    </div>
  );
};

export default Profile;
