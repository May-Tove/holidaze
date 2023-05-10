import React from 'react';
import PropTypes from 'prop-types';
import { FiCoffee, FiWifi } from 'react-icons/fi';
import { MdOutlinePets } from 'react-icons/md';
import { IoCarSportOutline } from 'react-icons/io5';

const VenueMeta = ({ meta }) => {
  const { breakfast, pets, wifi, parking } = meta || {};

  return (
    <>
      {breakfast && (
        <div className="flex gap-2 items-center text-sm">
          <FiCoffee size={20} />
          <p>Free breakfast included</p>
        </div>
      )}
      {pets && (
        <div className="flex gap-2 items-center text-sm">
          <MdOutlinePets size={20} />
          <p>Pets allowed</p>
        </div>
      )}
      {wifi && (
        <div className="flex gap-2 items-center text-sm">
          <FiWifi size={20} />
          <p>Free access to wifi connection</p>
        </div>
      )}
      {parking && (
        <div className="flex gap-2 items-center text-sm">
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
