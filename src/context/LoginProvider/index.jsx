import React, { createContext, useContext } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import PropTypes from 'prop-types';

//https://www.youtube.com/watch?v=v2R0DFXqaF0&t=445s&ab_channel=FullStackNiraj
const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [profile, setProfile] = useLocalStorage('profile', {});
  const [token, setToken] = useLocalStorage('token', '');
  const [avatar, setAvatar] = useLocalStorage('avatar', '');

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        profile,
        setProfile,
        token,
        setToken,
        avatar,
        setAvatar,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
