import React from 'react';
import { Helmet } from 'react-helmet-async';
import LoginForm from '../../components/Forms/Login';

export const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login | Holidaze</title>
        <meta
          name="description"
          content="Log in to your Holidaze account. Access exclusive travel experiences worldwide, manage your venues, and connect with our global community."
        />
      </Helmet>

      <main className="main-layout">
        <h1>Login</h1>
        <LoginForm />
      </main>
    </>
  );
};
