import React, { useContext, useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthProvider';
import { searchFriend } from '../../api/friend';

const NavSearch = () => {
  const [search, setSearch] = useState('');
  const { authInfo } = useContext(AuthContext);
  const userId = authInfo.profile?.id;

  const handleChange = async (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSearch(value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const { user, error } = await searchFriend(search, userId);
    console.log(user);
  };

  return (
    <div>
      <div className='search-bar'>
        <form action='' className='w-full' onSubmit={handleSearch}>
          <input
            className='relative'
            placeholder='search for users'
            value={search}
            onChange={handleChange}
          />
          <FiSearch className='absolute top-1/2 left-8 -translate-y-1/2 text-gray-500' />
        </form>
      </div>
    </div>
  );
};

export default NavSearch;
