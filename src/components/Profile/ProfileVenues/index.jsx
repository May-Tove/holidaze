import React from 'react';
import PropTypes from 'prop-types';
import useToggle from '../../../hooks/useToggle';
import VenueCard from '../../VenueCard';
import { VenueForm } from '../../Forms';
import { TbHomePlus } from 'react-icons/tb';

/**
 * A component that renders a list of venues for a user's profile.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.venues - An array of venue objects.
 * @param {boolean} props.isOwnProfile - A boolean indicating whether the profile belongs to the current user.
 * @returns {JSX.Element} A list of venue cards, each containing information about the venue.
 */
const ProfileVenues = ({ venues, isOwnProfile }) => {
  const [isCreateVenueOpen, toggleCreateVenue] = useToggle();

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h2>Venues ({venues && venues.length})</h2>
        {isOwnProfile && (
          <button
            className="btn flex items-center gap-2"
            onClick={toggleCreateVenue}
            aria-label="Create new venue button"
          >
            <TbHomePlus size={20} aria-label="House icon" />
            New venue
          </button>
        )}
      </div>
      {isCreateVenueOpen && (
        <VenueForm mode={'create'} venue={{}} handleClose={toggleCreateVenue} />
      )}
      {venues && venues.length > 0 ? (
        <div className="grid grid-cols-3 gap-5">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <p className="no-results-message">You have no venues</p>
      )}
    </>
  );
};

ProfileVenues.propTypes = {
  venues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  isOwnProfile: PropTypes.bool,
};

export default ProfileVenues;
