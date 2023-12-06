import React, { useContext, useState, useEffect, useRef } from 'react';

import { FiSearch } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthProvider';
import { searchFriend } from '../../api/friend';
// import ModalBox from '../ModalBox';
import AlreadyFriendsResult from '../Friend/AlreadyFriendsResult';
import NotFriends from '../Friend/NotFriends';
import { NotificationContext } from '../../context/NotificationProvider';

const NavSearch = ({}) => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  const { updateNotification } = useContext(NotificationContext);

  const { authInfo } = useContext(AuthContext);
  const userId = authInfo.profile?.id;
  const username = authInfo.profile?.name;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleChange = async (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSearch([value]);
    const { user, error } = await searchFriend(value, userId);
    console.log(error);
    const result = user ? [user] : [];

    setSearchResult(result);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  return (
    <div>
      <div className='search-bar' ref={containerRef}>
        <form
          action=''
          className='w-full'
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className='relative'
            placeholder='search for users'
            value={search}
            onChange={handleChange}
            onClick={handleInputFocus}
          />
          <FiSearch className='absolute top-1/2 left-8 -translate-y-1/2 text-gray-500' />
        </form>

        {isFocused && (
          <div className='search-result'>
            {Array.isArray(searchResult) && searchResult.length > 0 ? (
              <ul className='w-full'>
                {searchResult.map((user, index) => (
                  <div
                    className='flex items-center justify-between '
                    key={user.id}
                  >
                    <div className='result-left'>
                      <div className='user-avatar'>
                        <img
                          src={user.avatar}
                          alt=''
                          className='search-avatar'
                        />
                      </div>
                      <div className='user-details'>
                        <li key={index} className='text-md name'>
                          {user.name}
                        </li>
                        <li key={index} className='text-sm email'>
                          {user.email}
                        </li>
                      </div>
                    </div>

                    <div className='decision result-right'>
                      {user.isAlreadyFriend ? (
                        <AlreadyFriendsResult />
                      ) : username === user.name ? (
                        ''
                      ) : (
                        <NotFriends
                          friendId={user.id}
                          requestAlreadyReceived={user.requestAlreadyReceived}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <p className='text-sm text-gray-500'>Your friends don't exist</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavSearch;
