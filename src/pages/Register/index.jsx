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
        <section className="max-w-[600px] m-auto">
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
        </section>
      </main>
    </>
  );
};
