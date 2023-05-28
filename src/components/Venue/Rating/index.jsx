import React from 'react';
import PropTypes from 'prop-types';
import { BsFillStarFill } from 'react-icons/bs';

/**
 * A component that displays a rating as a star icon and a number.
 *
 * @param {Object} props - The component props.
 * @param {number} props.rating - The rating to display.
 * @returns {JSX.Element} A rating component.
 */
const Rating = ({ rating }) => {
  return (
    <div className="flex items-center gap-2">
      <BsFillStarFill
        size={15}
        aria-label="Star icon"
        className="text-yellow-400 mb-1"
      />
      <span>{typeof rating === 'number' ? rating.toFixed(1) : rating}</span>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
};

export default Rating;
