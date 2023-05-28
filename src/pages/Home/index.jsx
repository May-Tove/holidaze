import React from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import Hero from '../../components/Hero';
import AboutImage from '../../assets/about-section.jpg';
import ContactImage from '../../assets/contact-section.jpg';
import RegisterImage from '../../assets/register-section.jpg';

export const Home = () => {
  return (
    <>
      <SEOHelmet
        title={'Home | Holidaze'}
        description={
          'Holidaze is your ultimate destination for booking and renting out any type of accommodation all around the world. Discover amazing vacation experiences or list your venue to attract a worldwide audience. Start your journey with Holidaze today!'
        }
      />
      <main>
        <Hero />
        <section className="w-3/4 flex flex-col-reverse lg:flex-row gap-12 items-center m-auto mb-32">
          <div
            className="w-screen lg:w-2/5 bg-cover bg-center h-48 lg:h-[650px] 2xl:h-[700px] rounded-full"
            style={{
              backgroundImage: `url(${AboutImage})`,
            }}
          ></div>
          <div className="w-full lg:w-3/5 flex flex-col gap-4">
            <p className="uppercase text-xs font-bold text-primary tracking-widest">
              Who are we?
            </p>
            <h2 className="text-2xl lg:text-4xl mb-4">
              Welcome to Holidaze - Your Gateway to Extraordinary Stays
            </h2>
            <p>
              Discover a plethora of accommodations worldwide, from cozy city
              apartments to extravagant beach villas. But Holidaze is not just
              for the wanderers! It is a comprehensive platform where property
              owners can effortlessly rent out their spaces to globetrotters.
            </p>
            <p>
              Got a spare room or a vacation home? Why not transform it into an
              earning asset? List your property with us and start benefiting
              from a worldwide audience of travelers. Holidaze is where
              travelers meet hosts!
            </p>
          </div>
        </section>
        <section className="w-3/4 gap-4 flex flex-col items-center m-auto mb-32">
          <p className="uppercase text-center text-xs font-bold text-primary tracking-widest">
            Register an account
          </p>
          <h2 className="text-2xl lg:text-4xl text-center mb-4 w-full lg:w-3/4 m-auto">
            Quick Registration, Endless Possibilities
          </h2>
          <p className="text-center w-full lg:w-3/4 m-auto">
            Start your journey with us - be it for discovering your dream
            vacation stay or listing your own property. Our easy registration
            opens up a world of benefits, exclusive deals, and more. Join the
            Holidaze family today!
          </p>
          <Link to={'/register'} className="btn w-fit">
            Register
          </Link>
          <div
            className="w-screen lg:w-2/5 bg-cover bg-center h-48 lg:h-[650px] 2xl:h-[700px] rounded-full"
            style={{
              backgroundImage: `url(${RegisterImage})`,
            }}
          ></div>
        </section>

        <section className="w-3/4 flex flex-col-reverse lg:flex-row gap-12 items-center m-auto mb-12">
          <div
            className="w-screen lg:w-2/5 bg-cover bg-center h-48 lg:h-[650px] 2xl:h-[700px] rounded-full"
            style={{
              backgroundImage: `url(${ContactImage})`,
            }}
          ></div>
          <div className="w-full lg:w-3/5  flex flex-col gap-4">
            <p className="uppercase text-xs font-bold text-primary tracking-widest">
              We got you!
            </p>
            <h2 className="text-2xl lg:text-4xl mb-4">
              Let us help make your travel planning stress-free
            </h2>
            <p>
              Travel planning should be exciting, not stressful! Our team of
              travel enthusiasts is here to assist you, provide personalized
              advice, and help you discover the perfect stay for your next
              adventure. For the hosts, we are here to optimize your listings
              and connect you with a global audience. Reach out today, and let
              us make travel dreams a reality.
            </p>
            <Link to={'/contact'} className="btn w-max">
              Contact
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};
