import React from 'react';
import { Link } from 'react-router-dom';
import { RxTwitterLogo } from 'react-icons/rx';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <footer className="py-10 bg-gray-100 text-center md:text-left">
        <div className="flex flex-col gap-20 items-center m-auto w-[80vw] max-w-[1200px] md:flex-row">
          <div className="w-full">
            <h3 className="font-serif text-5xl text-slate-700 font-extrabold">
              Holidaze
            </h3>
            <div className="space-y-3 my-3">
              <p> Follow us on social media</p>
              <div className="flex gap-3 items-center justify-center text-gray-400 md:justify-start">
                <div className="rounded-full w-fit h-16 flex items-center border border-gray-400 p-2">
                  <FaFacebook size={20} />
                </div>
                <div className="rounded-full w-fit h-16 flex items-center border border-gray-400 p-2">
                  <RxTwitterLogo size={20} />
                </div>
                <div className="rounded-full w-fit h-16 flex items-center border border-gray-400 p-2">
                  <FaInstagram size={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full md:flex-row">
            <div className="flex flex-col gap-3 w-full">
              <p className="font-bold">Navigation</p>
              <Link className="underline hover:text-blue-700" to={'/'}>
                Home
              </Link>
              <Link className="underline hover:text-blue-700" to={'/venues'}>
                Venues
              </Link>
              <Link className="underline hover:text-blue-700" to={'/contact'}>
                Contact
              </Link>
              <Link className="underline hover:text-blue-700" to={'/about'}>
                About
              </Link>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <p className="font-bold">Get Started</p>
              <Link className="underline hover:text-blue-700" to={'/register'}>
                Register
              </Link>
              <Link className="underline hover:text-blue-700" to={'/login'}>
                Login
              </Link>
            </div>
          </div>

          <div className="w-full text-sm space-y-3">
            <p className="font-medium"> Disclaimer</p>
            <p>
              Holidaze is a purely hypothetical company created exclusively as
              part of my final examination project at Noroff School of
              Technology and Media.
            </p>
            <p>
              It does not correspond to any existing business entity in the real
              world.
            </p>
          </div>
        </div>
        <div className="text-sm text-center m-auto mt-20 pt-10 border-t border-gray-300 space-y-2">
          <p>Designed and developed by May-Tove Hovdal</p>
          <p>&copy; Copyright 2023</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
