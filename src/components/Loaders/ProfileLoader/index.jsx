import React from 'react';
import AllVenuesLoader from '../AllVenuesLoader';

const ProfileLoader = () => {
  return (
    <div className="w-5/6 m-auto lg:w-4/5 py-40">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-52 h-52 bg-gray-200 rounded-full"></div>
        <div className="w-36 h-4 mt-4 bg-gray-200 rounded"></div>
        <div className="w-28 h-4 mt-2 bg-gray-200 rounded"></div>
      </div>
      <div className="mt-14 flex gap-4 border-b pb-4">
        <div className="w-20 h-8 bg-gray-200 rounded"></div>
        <div className="w-20 h-8 bg-gray-200 rounded"></div>
        <div className="w-20 h-8 bg-gray-200 rounded"></div>
      </div>
      <div>
        <div className="w-40 h-10 mt-7 bg-gray-200 rounded"></div>
        <AllVenuesLoader />
      </div>
    </div>
  );
};

export default ProfileLoader;
