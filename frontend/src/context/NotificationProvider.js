import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

let timeOutId;
const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState('');
  const [classes, setClasses] = useState();

  const updateNotification = (type, value) => {
    if (timeOutId) clearTimeout(timeOutId);
    switch (type) {
      case 'error':
        setClasses('bg-red-500 border-red-900 ');
        break;
      case 'success':
        setClasses('bg-green-500 border-green-900 ');
        break;
      case 'warning':
        setClasses('bg-orange-500 border-orange-900 ');
        break;
      default:
        setClasses('bg-red-500 border-red-900 ');
        break;
    }
    setNotification(value);
    timeOutId = setTimeout(() => {
      setNotification('');
    }, 3000);
  };
  return (
    <NotificationContext.Provider
      value={{
        updateNotification,
      }}
    >
      {children}
      {notification && (
        <div className='fixed left-1/2  -translate-x-1/2 top-14 px-4 py-1 z-20'>
          <div
            className={
              classes + 'bounce-in-top rounded font-semibold border-b-2'
            }
          >
            <p className='text-white px-4 py-2 text-center'>{notification}</p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
