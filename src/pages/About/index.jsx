import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../../components/Breadcrumbs';

export const About = () => {
  return (
    <>
      <Helmet>
        <title>About | Holidaze</title>
        <meta
          name="description"
          content="Holidaze is the ultimate platform for booking accommodations worldwide, as well as a way for property owners to access a global audience. We provide a broad selection of venues to suit any vacation, inspired by our aim to make travel extraordinary. Start exploring with Holidaze today!"
        />
      </Helmet>
      <main className="main-layout">
        <Breadcrumbs page={'About'} />
        <h1>About</h1>
      </main>
    </>
  );
};
