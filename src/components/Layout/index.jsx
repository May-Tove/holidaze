import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/index';
import Navigation from '../Header/Navigation/index';

const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
