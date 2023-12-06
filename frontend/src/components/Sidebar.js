import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import DashboardOption from './Dashboard/DashboardOption';
import { AuthContext } from '../context/AuthProvider';
import Profile from './OwnProfile';

const Sidebar = () => {
  const [active, setActive] = useState(true);
  const { authInfo } = useContext(AuthContext);

  const username = authInfo.profile?.name;
  const useremail = authInfo.profile?.email;
  const avatar = authInfo.profile?.avatar;

  const handleClick = (e) => {
    e.preventDefault();

    setActive(!active);
  };

  return (
    <div className='sidebar flex flex-col gap-4'>
      <div className='bg-white rounded-xl'>
        <Profile avatar={avatar} name={username} email={useremail} />
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
