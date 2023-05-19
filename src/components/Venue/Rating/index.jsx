import React from 'react';
import PropTypes from 'prop-types';
import { IoMdStar } from 'react-icons/io';

const Rating = ({ rating }) => {
  return (
    <div className="flex items-center justify-center gap-1 px-2 py-1 h-fit bg-primaryLight text-primaryDark rounded-full text-sm">
      <IoMdStar size={15} />
      <span>{rating}</span>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
};

export default Rating;
