import React from 'react';
import { BiImage } from 'react-icons/bi';

const PlaceholderImage = () => {
  return (
    <div className="h-full flex justify-center items-center bg-gray-300 text-gray-400">
      <BiImage size={100} />
    </div>
  );
};

export default PlaceholderImage;
