import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

//https://www.youtube.com/watch?v=v2R0DFXqaF0&t=445s&ab_channel=FullStackNiraj
const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        profile,
        setProfile,
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
