import React from 'react';
import PropTypes from 'prop-types';
import { FiCoffee, FiWifi } from 'react-icons/fi';
import { MdOutlinePets } from 'react-icons/md';
import { IoCarSportOutline } from 'react-icons/io5';

/**
 * A component that renders information badges for a venue's amenities.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.meta - An object containing information about the venue's amenities.
 * @param {boolean} props.meta.breakfast - A boolean indicating whether breakfast is included.
 * @param {boolean} props.meta.pets - A boolean indicating whether pets are allowed.
 * @param {boolean} props.meta.wifi - A boolean indicating whether Wi-Fi is available.
 * @param {boolean} props.meta.parking - A boolean indicating whether parking is available.
 * @returns {JSX.Element} A list of information badges for the venue's amenities.
 */
const Meta = ({ meta }) => {
  const { breakfast, pets, wifi, parking } = meta || {};

  if (!meta) {
    return null;
  }

  return (
    <>
      {wifi && (
        <div className="metas-badge">
          <FiWifi size={20} aria-label="Wi-Fi icon" />
          <p>Free Wi-Fi</p>
        </div>
      )}
      {breakfast && (
        <div className="metas-badge">
          <FiCoffee size={20} aria-label="Coffee icon" />
          <p>Breakfast included</p>
        </div>
      )}
      {pets && (
        <div className="metas-badge">
          <MdOutlinePets size={20} aria-label="Pets icon" />
          <p>Pets allowed</p>
        </div>
      )}

      {parking && (
        <div className="metas-badge">
          <IoCarSportOutline size={20} aria-label="Car icon" />
          <p>Free parking on site</p>
        </div>
      )}
    </>
  );
};

Meta.propTypes = {
  meta: PropTypes.shape({
    breakfast: PropTypes.bool,
    pets: PropTypes.bool,
    wifi: PropTypes.bool,
    parking: PropTypes.bool,
  }),
};

export default Meta;
