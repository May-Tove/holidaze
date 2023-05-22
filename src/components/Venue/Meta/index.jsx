import React from 'react';
import PropTypes from 'prop-types';
import { FiCoffee, FiWifi } from 'react-icons/fi';
import { MdOutlinePets } from 'react-icons/md';
import { IoCarSportOutline } from 'react-icons/io5';

const VenueMeta = ({ meta }) => {
  const { breakfast, pets, wifi, parking } = meta || {};

  return (
    <>
      {wifi && (
        <div className="infoBadge">
          <FiWifi size={20} />
          <p>Free Wi-Fi</p>
        </div>
      )}
      {breakfast && (
        <div className="infoBadge">
          <FiCoffee size={20} />
          <p>Breakfast included</p>
        </div>
      )}
      {pets && (
        <div className="infoBadge">
          <MdOutlinePets size={20} />
          <p>Pets allowed</p>
        </div>
      )}

      {parking && (
        <div className="infoBadge">
          <IoCarSportOutline size={20} />
          <p>Free parking on site</p>
        </div>
      )}
    </>
  );
};

VenueMeta.propTypes = {
  meta: PropTypes.shape({
    breakfast: PropTypes.bool,
    pets: PropTypes.bool,
    wifi: PropTypes.bool,
    parking: PropTypes.bool,
  }),
};

export default VenueMeta;
