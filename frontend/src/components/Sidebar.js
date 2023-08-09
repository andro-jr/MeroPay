import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import DashboardOption from './DashboardOption';
import { AuthContext } from '../context/AuthProvider';

const Sidebar = () => {
  const [active, setActive] = useState(true);
  const { authInfo } = useContext(AuthContext);

  const username = authInfo.profile?.name;
  const useremail = authInfo.profile?.email;

  const handleClick = (e) => {
    e.preventDefault();

    setActive(!active);
  };

  return (
    <div className='sidebar flex flex-col gap-4'>
      <div className='bg-white rounded-xl'>
        <div className='profile'>
          <div className='profile-avatar'>
            <Link to='/'>
              <img src='/avatar.jpg' alt='profile-avatar' />
            </Link>
          </div>
          <div className='avatar-info'>
            <p>
              <Link to='/'>{username}</Link>
            </p>
            <span>
              <Link to='/'>{useremail}</Link>
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between min-h-[60vh]'>
        <div className='dashboard bg-white rounded-xl'>
          <DashboardOption />
        </div>
        <div>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
