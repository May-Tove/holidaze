import React from 'react';
import { RxTwitterLogo } from 'react-icons/rx';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <footer className="py-5 bg-gray-200">
        {' '}
        <div className="text-center space-y-3 my-3">
          <h3> Follow us on social media:</h3>
          <div className="flex justify-center gap-3 text-gray-400">
            <div className="rounded-full w-fit h-16 flex items-center border border-gray-400 p-2">
              <FaFacebook size={30} />
            </div>
            <div className="rounded-full w-fit h-16 flex items-center border border-gray-400 p-2">
              <RxTwitterLogo size={30} />
            </div>
            <div className="rounded-full w-fit h-16 flex items-center border border-gray-400 p-2">
              <FaInstagram size={30} />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
