import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineLocationMarker } from 'react-icons/hi';

/**
 * A component that renders a location based on its address, city, and country.
 *
 * @param {Object} props - The component props.
 * @param {string} props.address - The address of the location.
 * @param {string} props.city - The city of the location.
 * @param {string} props.country - The country of the location.
 * @returns {JSX.Element} A paragraph element containing the location information.
 */
const Location = ({ address, city, country }) => {
  const isUnknown =
    (!address && !city && !country) ||
    (address === 'Unknown' && city === 'Unknown' && country === 'Unknown');

  if (!address && !city && !country) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <HiOutlineLocationMarker
        size={20}
        aria-aria-label="Location marker icon"
        className="mb-1"
      />{' '}
      <p className="capitalize">
        {isUnknown ? 'Location unknown' : `${address}, ${city}, ${country}`}
      </p>
    </div>
  );
};

Location.propTypes = {
  address: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
};

export default Location;
