import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Holidaze</title>
        <meta
          name="description"
          content="Oops! The page you're searching for does not exist. But don't worry, Holidaze remains your go-to site for unique accommodations all over the world. Let us help you get back on track!"
        />
      </Helmet>
      <main className="main-layout h-screen flex flex-col gap-5 items-center justify-center text-center">
        <h1 className="text-7xl text-primaryDark">404</h1>
        <p className="max-w-[500px]">
          Oops! The page you are searching for does not exist. But do not worry,
          Holidaze remains your go-to site for unique accommodations all over
          the world. Let us help you get back on track!
        </p>
        <Link to={'/'} className="btn">
          Take me home
        </Link>
      </main>
    </>
  );
};
