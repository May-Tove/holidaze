import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io';

/**
 * Renders a star rating component based on a given rating.
 * @param {object} props - The component props.
 * @param {number} props.rating - The rating to display, between 0 and 5.
 * @returns {JSX.Element} The rendered star rating component.
 */
const Rating = ({ rating }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const roundedRating = Math.round(rating * 2) / 2;
    const newStars = [];

    for (let i = 0; i < Math.floor(roundedRating); i++) {
      newStars.push(<IoMdStar aria-label="Star icon" key={i} />);
    }

    if (roundedRating % 1 !== 0) {
      newStars.push(
        <IoMdStarHalf aria-label="Half star icon" key={newStars.length} />
      );
    }

    for (let i = newStars.length; i < 5; i++) {
      newStars.push(<IoMdStarOutline aria-label="Empty star icon" key={i} />);
    }

    setStars(newStars);
  }, [rating]);

  return (
    <>
      <span className="flex text-secondary">{stars}</span>
      <p className="text-sm text-gray-600">{rating} out of 5</p>
    </>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Rating;
