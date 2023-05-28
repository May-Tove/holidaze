import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/Forms/Register';
import SEOHelmet from '../../components/SEOHelmet';

export const Register = () => {
  return (
    <>
      <SEOHelmet
        title={'Register | Holidaze'}
        description={
          'Join Holidaze today to gain access to unique travel experiences all over the world. Alternatively, you can register your property to attract a global audience.'
        }
      />
      <main className="main-layout">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-40 mt-10">
          <div className="flex flex-col gap-3 lg:w-1/2">
            <p>
              By registering an account with us, you can access a wide range of
              accommodations, from hotels and resorts to villas and apartments,
              and find the perfect place to stay for your next vacation.
            </p>
            <p>
              Creating an account with us is easy and unlocks a unique range of
              properties around the world. If you are a property owner, you can
              also list your property with us and connect with a global audience
              of travelers.
            </p>
            <p>
              Sign up today and start planning your next adventure with
              Holidaze. Our user-friendly platform makes it easy to browse and
              book accommodations from any device. Whether you are looking for a
              romantic getaway, a family vacation, or a solo adventure, we have
              the perfect accommodations for you.
            </p>
          </div>
          <div className="lg:w-1/2">
            <div className="space-y-2 pb-5 text-center">
              <h1>Get started</h1>
              <p>Register your account at Holidaze today</p>
            </div>
            <RegisterForm />
            <div className="text-center mt-10">
              Already have an account?{' '}
              <Link to={'/login'} className="text-blue-600">
                Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
