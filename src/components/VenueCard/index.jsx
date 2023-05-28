import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import ImageSlider from '../VenueImages/ImageSlider';
import Rating from '../Venue/Rating';
import { formatCurrency } from '../../utilities';

/**
 * A component that displays a card for a venue.
 *
 * @param {Object} venue - The venue object to display.
 * @param {string} props.venue.name - The name of the venue.
 * @param {string} props.venue.id - The ID of the venue.
 * @param {number} props.venue.price - The price of the venue.
 * @param {Array} props.venue.media - The media array of the venue.
 * @param {number} props.venue.rating - The rating of the venue.
 * @param {Object} props.venue.location - The location object of the venue.
 * @param {string} props.venue.location.address - The address of the venue.
 * @param {string} props.venue.location.city - The city of the venue.
 * @param {string} props.venue.location.country - The country of the venue.
 * @returns {JSX.Element} A venue card component.
 */
const VenueCard = ({ venue: { name, id, price, media, rating, location } }) => {
  const venuePrice = formatCurrency(price);

  return (
    <Link
      to={`/venue/${id}`}
      aria-label={`Link to ${name}`}
      data-testid="venue-card"
    >
      <article className="flex flex-col items-center bg-white rounded-2xl shadow-lg">
        <div className="w-full h-72">
          <ImageSlider media={media} />
        </div>
        <div className="w-full space-y-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h2>{name}</h2>
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
            <span className="text-lg text-bluePop font-semibold">
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
