import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../Avatar';
import { Link } from 'react-router-dom';

/**
 * A component that displays the owner of a venue.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.owner - An object containing information about the owner of the venue.
 * @param {string} props.owner.name - The name of the owner of the venue.
 * @param {string} props.owner.avatar - The URL of the avatar for the owner of the venue.
 * @returns {JSX.Element|null} A div element containing the owner information, or null if no owner is provided.
 */
const Owner = ({ owner }) => {
  if (!owner) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <p>Hosted by</p>
      <div className="flex items-center gap-2 hover:underline">
        <Avatar
          className="w-6 h-6 rounded-full"
          src={owner?.avatar}
          alt={`Image of ${owner?.name}`}
        />
        <div>
          <Link to={`/profile/${owner?.name}`} className="font-bold">
            {owner?.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

Owner.propTypes = {
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

export default Owner;
