import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import ImageSlider from '../ImageSlider';
import Rating from '../Rating';
import formatCurrency from '../../utilities/formatCurrency';

const VenueCard = ({ venue: { name, id, price, media, rating, location } }) => {
  const venuePrice = formatCurrency(price);

  return (
    <article className="flex flex-col items-center bg-gray-100  drop-shadow">
      <ImageSlider media={media} />
      <Link
        to={`/Venue/${id}`}
        className="w-full flex flex-col gap-2 justify-between p-4"
      >
        <h5 className="text-xl capitalize font-bold font-serif text-gray-900">
          {name}
        </h5>
        <div className="flex items-center gap-2">
          <HiOutlineLocationMarker />
          <p className="text-sm">
            {location.city === 'Unknown' || location.city === ''
              ? 'Location unknown'
              : `${location.city}, `}
            {location.country === 'Unknown' || location.city === ''
              ? ' '
              : location.country}
          </p>
        </div>
        <div className="flex gap-2 mb-2">
          <Rating rating={rating} />
        </div>
        <p className="pt-4 font-bold border-t">{venuePrice} / Night</p>
      </Link>
    </article>
  );
};

VenueCard.propTypes = {
  venue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    media: PropTypes.array.isRequired,
    rating: PropTypes.number.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default VenueCard;
