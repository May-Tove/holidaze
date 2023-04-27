import React from 'react';

const VenueSkeletonLoader = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 drop-shadow animate-pulse">
      <div className="h-72 w-full animate-pulse bg-gray-300" />
      <div className="w-full flex flex-col gap-2 justify-between p-4">
        <div className="h-6 w-full animate-pulse bg-gray-300" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-pulse bg-gray-300 rounded-full" />
          <div className="h-4 w-24 animate-pulse bg-gray-300" />
        </div>
        <div className="flex gap-2 mb-2">
          <div className="h-4 w-14 animate-pulse bg-gray-300 rounded-full" />
        </div>
        <div className="h-6 w-full animate-pulse bg-gray-300" />
      </div>
    </div>
  );
};

export default VenueSkeletonLoader;
