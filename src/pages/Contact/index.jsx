import React from 'react';
import { Helmet } from 'react-helmet-async';

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
        <h1>Contact</h1>
      </main>
    </>
  );
};
