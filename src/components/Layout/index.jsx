import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Navigation/index';
import Footer from '../Footer/index';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
