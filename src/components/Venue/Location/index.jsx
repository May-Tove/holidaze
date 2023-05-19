import React from 'react';
import PropTypes from 'prop-types';

const Location = ({ address, city, country }) => {
  const isUnknown =
    (!address && !city && !country) ||
    (address === 'Unknown' && city === 'Unknown' && country === 'Unknown');

  return (
    <p className="capitalize">
      {isUnknown ? 'Location unknown' : `${address}, ${city}, ${country}`}
    </p>
  );
};

Location.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default Location;
