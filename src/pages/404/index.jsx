import React from 'react';
import { Helmet } from 'react-helmet-async';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Holidaze</title>
        <meta
          name="description"
          content="Oops! The page you're searching for does not exist. But don't worry, Holidaze remains your go-to site for unique accommodations all over the world. Let us help you get back on track!"
        />
      </Helmet>
      <main className="main-layout">
        <h1>404</h1>
      </main>
    </>
  );
};
