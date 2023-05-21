import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import BackgroundHero from '../../assets/bg-hero.jpg';
import AboutImage from '../../assets/about-section.jpg';
import ContactImage from '../../assets/contact-section.jpg';
import RegisterImage from '../../assets/register-section.jpg';
import SearchBar from '../../components/SearchBar';

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Holidaze</title>
        <meta
          name="description"
          content="Holidaze is your ultimate destination for booking and renting out any type of accommodation all around the world. Discover amazing vacation experiences or list your venue to attract a worldwide audience. Start your journey with Holidaze today!"
        />
      </Helmet>
      <main>
        <section
          className="bg-cover bg-center h-screen flex flex-col mb-20"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),url(${BackgroundHero})`,
          }}
        >
          <h1 className="text-white pt-20 text-center text-4xl lg:text-7xl w-3/4 m-auto">
            Time for a getaway? Find the ideal place to stay
          </h1>
          <SearchBar />
        </section>
        <section className="w-3/4 flex flex-col-reverse lg:flex-row gap-12 items-center m-auto mb-32">
          <div
            className="w-screen lg:w-2/5 bg-cover bg-center h-48 lg:h-[550px] 2xl:h-[700px]"
            style={{
              backgroundImage: `url(${AboutImage})`,
            }}
          ></div>
          <div className="w-full lg:w-3/5 flex flex-col gap-4">
            <p className="uppercase text-xs font-bold text-secondary">
              Who are we?
            </p>
            <h2 className="text-2xl lg:text-4xl mb-4">
              Your ultimate destination for booking and renting out
              accommodations worldwide
            </h2>
            <p>
              Our user-friendly platform offers a wide range of accommodations,
              from cozy apartments to luxurious villas, at the best prices
              available. But that’s not all – at Holidaze, we also make it easy
              for property owners to rent out their accommodations to a global
              audience of travelers.
            </p>
            <p>
              Whether you have a spare room, an entire apartment, or a vacation
              home, you can list your property with us and start earning money.
              So why wait? Whether you’re looking to book your dream vacation or
              rent out your property to travelers worldwide, Holidaze has
              everything you need to make your travel dreams a reality.
            </p>
          </div>
        </section>
        <section className="w-3/4 gap-4 flex flex-col m-auto mb-32">
          <p className="uppercase text-center text-xs font-bold text-secondary">
            Popular categories
          </p>
          <h2 className="text-2xl lg:text-4xl text-center mb-4 w-full lg:w-3/4 m-auto">
            Looking for some travel inspiration? Check out our most popular
            categories
          </h2>
          <p className="text-center mb-12 w-full lg:w-3/4 m-auto">
            From the white sandy beaches of the Caribbean to the bustling
            streets of Tokyo, we have a wide range of accommodations in some of
            the worlds most iconic and beautiful destinations.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center text-white">
            <div className="category-card-container">
              <Link
                to={'/venues'}
                className="category-card"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)),url(${BackgroundHero})`,
                }}
              >
                <h3 className="font-serif text-2xl">Hotels</h3>
              </Link>
            </div>
            <div className="category-card-container">
              <Link
                to={'/venues'}
                className="category-card"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)),url(${BackgroundHero})`,
                }}
              >
                <h3 className="font-serif text-2xl">Cabin</h3>
              </Link>
            </div>
            <div className="category-card-container">
              <Link
                to={'/venues'}
                className="category-card"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)),url(${BackgroundHero})`,
                }}
              >
                <h3 className="font-serif text-2xl">Villas</h3>
              </Link>
            </div>
            <div className="category-card-container">
              <Link
                to={'/venues'}
                className="category-card"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)),url(${BackgroundHero})`,
                }}
              >
                <h3 className="font-serif text-2xl">Treehouses</h3>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-3/4 flex flex-col lg:flex-row gap-12  items-center m-auto mb-32">
          <div className="w-full lg:w-3/5  flex flex-col gap-4">
            <p className="uppercase text-xs font-bold text-secondary">
              Register an account
            </p>
            <h2 className="text-2xl lg:text-4xl mb-4">
              Book your next stay or rent out your accommodation to the world?
              Register at Holidaze today!
            </h2>
            <p>
              Registering an account with us is quick and easy, and it unlocks a
              world of possibilities for your next vacation. With an account,
              you can easily save your favorite accommodations, access exclusive
              deals, and receive personalized recommendations based on your
              travel preferences.
            </p>
            <p>
              Do you have a property that you would like to rent out to
              travelers worldwide? At Holidaze, we make it easy to connect with
              potential guests and maximize your earning potential.
            </p>
            <p>
              By listing your property on our website, you gain access to a
              global audience of travelers who are looking for unique and
              memorable accommodations. Our user-friendly platform allows you to
              manage your accommodations and accept bookings all in one place.
            </p>
            <Link to={'/register'} className="btn w-max">
              Register
            </Link>
          </div>
          <div
            className="w-screen lg:w-2/5 bg-cover bg-center h-48 lg:h-[550px] 2xl:h-[700px]"
            style={{
              backgroundImage: `url(${RegisterImage})`,
            }}
          ></div>
        </section>
        <section className="w-3/4 flex flex-col-reverse lg:flex-row gap-12 items-center m-auto mb-12">
          <div
            className="w-screen lg:w-2/5 bg-cover bg-center h-48 lg:h-[550px] 2xl:h-[700px]"
            style={{
              backgroundImage: `url(${ContactImage})`,
            }}
          ></div>
          <div className="w-full lg:w-3/5  flex flex-col gap-4">
            <p className="uppercase text-xs font-bold text-secondary">
              We got you!
            </p>
            <h2 className="text-2xl lg:text-4xl mb-4">
              Let us help make your travel planning stress-free
            </h2>
            <p>
              Our team of experts is here to answer your questions, provide
              personalized recommendations based on your preferences and budget,
              and help you find the perfect accommodations for your next
              adventure.
            </p>
            <p>
              If you’re a property owner looking to rent out your
              accommodations, our team can also help you maximize your earning
              potential and connect with a global audience of travelers. Contact
              us today to learn more about how we can help you list your
              property on our platform and reach a wider audience.
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
