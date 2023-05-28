import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/Forms/Login';
import image from '../../assets/chill-beach.jpg';
import image2 from '../../assets/food.jpg';
import SEOHelmet from '../../components/SEOHelmet';

export const Login = () => {
  return (
    <>
      <SEOHelmet
        title={'Login | Holidaze'}
        description={
          'Log in to your Holidaze account. Access exclusive travel experiences worldwide, manage your venues, and connect with our global community.'
        }
      />
      <main className="main-layout flex items-center gap-20">
        <div className="hidden w-1/2 grid-cols-2 grid-rows-3 gap-4 h-[700px] lg:grid ">
          <img
            className="h-full w-full rounded-3xl row-span-1 shadow-xl"
            src={image2}
            alt=""
          />
          <img
            className="h-full w-full rounded-3xl row-span-2 shadow-xl"
            src={image}
            alt=""
          />

          <img
            className="h-full w-full rounded-3xl row-span-2 shadow-xl"
            src="https://images.pexels.com/photos/4913317/pexels-photo-4913317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />

          <img
            className="h-full w-full rounded-3xl row-span-1 shadow-xl"
            src="https://images.unsplash.com/photo-1630809355701-af054d63cb31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=782&q=80"
            alt=""
          />
        </div>

        <div className="w-full max-w-[500px] m-auto">
          <div className="space-y-2 pb-5 text-center">
            <h1>Welcome back!</h1>
            <p>Login to your Holidaze account</p>
          </div>
          <LoginForm />
          <div className="text-center mt-10">
            Do not have an account?{' '}
            <Link to={'/register'} className="text-blue-800">
              Register
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
