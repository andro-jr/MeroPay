import React, { createContext, useContext, useEffect, useState } from 'react';
import { getisAuth, signInUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from './NotificationProvider';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { updateNotification } = useContext(NotificationContext);

  const navigate = useNavigate();

  const defaultAuthInfo = {
    profile: null,
    isLoggedIn: false,
    isPending: false,
    error: '',
  };

  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });

  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await signInUser({ email, password });
    if (error) {
      updateNotification('error', error);
      return setAuthInfo({ ...authInfo, isPending: false, error: error });
    }

    setAuthInfo({
      profile: {
        ...user,
      },
      isLoggedIn: true,
      isPending: false,
      error: '',
    });

    updateNotification('success', 'Sign In successful');

    localStorage.setItem('auth-token', user.token);
  };

  const isAuth = async () => {
    const token = localStorage.getItem('auth-token');

    if (!token) return;

    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await getisAuth(token);
    if (error) {
      updateNotification('error', error);
      return setAuthInfo({ ...authInfo, isPending: false, error: error });
    }


    setAuthInfo({
      profile: {
        ...user,
      },
      isLoggedIn: true,
      isPending: false,
      error: '',
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('firstLogin');

    setAuthInfo({ ...defaultAuthInfo });

    navigate('/auth/sign-in');
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authInfo,
        handleLogin,
        isAuth,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
