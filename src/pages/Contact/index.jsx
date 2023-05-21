import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../../components/Breadcrumbs';

export const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Holidaze</title>
        <meta
          name="description"
          content="Get in touch with the Holidaze team. Whether you have a question, need assistance, or have feedback, we're here to help."
        />
      </Helmet>
      <main className="main-layout">
        <Breadcrumbs page={'Contact'} />
        <h1>Contact</h1>
      </main>
    </>
  );
};
