import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HiOutlineLocationMarker, HiOutlineHeart } from 'react-icons/hi';
import ImageSlider from '../VenueImages/ImageSlider';
import formatCurrency from '../../shared/formatCurrency';
import Rating from '../Venue/Rating';

const VenueCard = ({ venue: { name, id, price, media, rating, location } }) => {
  const venuePrice = formatCurrency(price);

  return (
    <Link
      to={`/venue/${id}`}
      aria-label={`Link to ${name}`}
      data-testid="venue-card"
    >
      <article className="flex flex-col items-center bg-gray-100 rounded-2xl shadow-xl">
        <div className="w-full h-72 relative">
          <ImageSlider media={media} />
          <button
            className="absolute top-1 right-1 rounded-full shadow bg-white/80 hover:bg-white p-1 z-10"
            aria-label="Add to favourites"
          >
            <HiOutlineHeart size={20} />
          </button>
        </div>
        <div className="w-full space-y-2 p-4">
          <div className="flex justify-between gap-2">
            <h2 className="capitalize">{name}</h2>
            <Rating rating={rating} />
          </div>
          <div className="flex items-center gap-1 pb-3">
            <HiOutlineLocationMarker />
            <p>
              {location?.city || 'City Unknown'},{' '}
              {location?.country || 'Country Unknown'}
            </p>
          </div>
          <p className="pt-4 border-t text-lightGrey text-sm">
            <span className="text-lg text-blue-500 font-bold font-serif">
              {venuePrice}
            </span>{' '}
            / Night
          </p>
        </div>
      </article>
    </Link>
  );
};

VenueCard.propTypes = {
  venue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    media: PropTypes.array,
    rating: PropTypes.number,
    location: PropTypes.shape({
      address: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
    }),
  }).isRequired,
};

export default VenueCard;
