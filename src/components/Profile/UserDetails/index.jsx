import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../Avatar';
import { TbDiscountCheckFilled, TbPhotoEdit } from 'react-icons/tb';

/**
 * A component that displays the user details, including their name, email, and avatar.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the user.
 * @param {string} props.email - The email of the user.
 * @param {boolean} props.isOwnProfile - A boolean indicating whether the profile being viewed is the user's own profile.
 * @param {string} props.avatar - The URL of the user's avatar.
 * @param {Object} props.data - An object containing additional user data.
 * @param {Function} props.toggleUpdateAvatar - A function to toggle the avatar update modal.
 * @param {boolean} props.venueManager - A boolean indicating whether the user is a venue manager.
 * @returns {JSX.Element} A div element containing the user details.
 */
const UserDetails = ({
  name,
  email,
  isOwnProfile,
  avatar,
  toggleUpdateAvatar,
  venueManager,
}) => {
  return (
    <div className="flex flex-col text-center items-center gap-3 m-auto mb-10">
      <div className="relative">
        <Avatar
          className="w-[200px] h-[200px] rounded-full shadow"
          src={avatar}
          alt={`Profile avatar of ${name}`}
        />
        {isOwnProfile && (
          <button
            className="btn p-2 rounded-full absolute bottom-2 right-2 shadow"
            onClick={toggleUpdateAvatar}
            aria-label="Update avatar button"
          >
            <TbPhotoEdit size={25} aria-label="Edit photo icon" />
          </button>
        )}
      </div>

      <div className="flex flex-col items-center gap-1">
        <h1>{name}</h1>
        {venueManager && (
          <div className="flex items-center gap-1">
            <TbDiscountCheckFilled
              className="text-blue-400"
              size={20}
              aria-label="Check icon"
            />
            <p>Venue Manager</p>
          </div>
        )}
        <p className="text-sm text-lightGrey">{email}</p>
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  isOwnProfile: PropTypes.bool.isRequired,
  avatar: PropTypes.string,
  toggleUpdateAvatar: PropTypes.func.isRequired,
  venueManager: PropTypes.bool,
};

export default UserDetails;
