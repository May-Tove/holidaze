import React from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import Hero from '../../components/Hero';
import AboutImage from '../../assets/about-section.jpg';
import ContactImage from '../../assets/contact-section.jpg';
import registerImage1 from '../../assets/register-img-2.jpg';
import registerImage2 from '../../assets/register-img-3.jpg';
import registerImage3 from '../../assets/register-img-4.jpg';

/**
 * The Home component represents the landing page of Holidaze.
 */
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
            className="w-[300px] h-[420px] md:w-[440px] md:h-[650px] bg-cover bg-center  rounded-full"
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
          <Link to={'/register'} className="btn w-fit md:mb-20">
            Register
          </Link>
          <div className="flex justify-center relative my-60">
            <div
              className="w-[200px] h-[320px] md:w-[320px] md:h-[480px]  bg-cover bg-center rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                backgroundImage: `url(${registerImage1})`,
              }}
            ></div>
            <div
              className="w-[150px] h-[250px] md:w-[240px] md:h-[350px] bg-cover bg-center rounded-full absolute left-0 top-1/2 transform -translate-x-[-30%] -translate-y-1/2 z-0"
              style={{
                backgroundImage: `url(${registerImage2})`,
              }}
            ></div>
            <div
              className="w-[150px] h-[250px] md:w-[240px] md:h-[350px] bg-cover bg-center rounded-full absolute right-0 top-1/2 transform translate-x-[-30%] -translate-y-1/2 z-0"
              style={{
                backgroundImage: `url(${registerImage3})`,
              }}
            ></div>
          </div>
        </section>

        <section className="w-3/4 flex flex-col lg:flex-row gap-12 items-center m-auto mb-12">
          <div className="w-full lg:w-3/5  flex flex-col gap-4">
            <p className="uppercase text-xs font-bold text-primary tracking-widest">
              We got you!
            </p>
            <h2 className="text-2xl lg:text-4xl mb-4">
              Let us help make your travel planning stress-free
            </h2>
            <p className="max-w-[700px]">
              Travel planning should be exciting, not stressful! Our team of
              travel enthusiasts is here to assist you, provide personalized
              advice, and help you discover the perfect stay for your next
              adventure. For the hosts, we are here to optimize your listings
              and connect you with a global audience. Reach out today, and let
              us make travel dreams a reality.
            </p>
            <Link to={'/contact'} className="btn w-fit mb-10 md:mb-0">
              Contact
            </Link>
          </div>
          <div
            className="w-[300px] h-[420px] md:w-[440px] md:h-[650px]  bg-cover bg-center rounded-full"
            style={{
              backgroundImage: `url(${ContactImage})`,
            }}
          ></div>
        </section>
      </main>
    </>
  );
};
