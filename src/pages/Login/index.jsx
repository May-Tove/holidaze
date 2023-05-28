import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/Forms/Login';
import beachImage from '../../assets/chill-beach.jpg';
import foodImage from '../../assets/food.jpg';
import livingroomImage from '../../assets/livingroom.jpg';
import bedImage from '../../assets/bed.jpg';
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
            src={foodImage}
            alt="Breakfast plate"
          />
          <img
            className="h-full w-full rounded-3xl row-span-2 shadow-xl"
            src={beachImage}
            alt="Couple relaxing by the water"
          />

          <img
            className="h-full w-full rounded-3xl row-span-2 shadow-xl"
            src={livingroomImage}
            alt="Small and cozy living room"
          />

          <img
            className="h-full w-full rounded-3xl row-span-1 shadow-xl"
            src={bedImage}
            alt="Hotel bed"
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
