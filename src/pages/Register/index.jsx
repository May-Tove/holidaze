import React from 'react';
import RegisterForm from '../../components/Auth/RegisterForm';

export const Register = () => {
  return (
    <main className="w-5/6 m-auto lg:w-4/5 py-40 ">
      <h1 className="text-2xl font-serif font-bold mb-5">Register</h1>
      <div className="flex flex-col lg:flex-row gap-20 lg:gap-40">
        <div className="flex flex-col gap-3 lg:w-1/2">
          <p>
            Welcome to Holidaze, your ultimate destination for booking
            accommodations worldwide! By registering an account with us, you can
            access a wide range of accommodations, from hotels and resorts to
            villas and apartments, and find the perfect place to stay for your
            next vacation.
          </p>
          <p>
            Creating an account with us is easy and unlocks a world of benefits,
            such as the ability to save your favourite properties, receive
            personalized recommendations, and access exclusive deals. If you are
            a property owner, you can also list your property with us and
            connect with a global audience of travelers.
          </p>
          <p>
            Sign up today and start planning your next adventure with Holidaze.
            Our user-friendly platform makes it easy to browse, compare, and
            book accommodations from any device. Whether you are looking for a
            romantic getaway, a family vacation, or a solo adventure, we have
            the perfect accommodations for you.
          </p>
          <p>
            Join the Holidaze community today and experience the world of travel
            like never before.
          </p>
        </div>
        <div className="lg:w-1/2">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
};
