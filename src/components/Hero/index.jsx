import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundHero from '../../assets/infinity-pool.jpg';

const Hero = () => {
  return (
    <section
      className="bg-cover bg-center h-screen flex flex-col gap-10 mb-20 justify-center items-center text-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),url(${BackgroundHero})`,
      }}
    >
      <h1 className="text-white text-2xl w-3/4 drop-shadow lg:text-5xl">
        Uncover Unforgettable Stays or Share Your Space with the World
      </h1>
      <Link className="btn text-xl py-3 px-4 w-fit mb-10 " to={'/venues'}>
        Discover venues
      </Link>
    </section>
  );
};

export default Hero;
