import React from 'react';
import PropTypes from 'prop-types';
import useToggle from '../../../hooks/useToggle';
import VenueCard from '../../VenueCard';
import { VenueForm } from '../../Forms';
import { TbHomePlus } from 'react-icons/tb';

export const ProfileVenues = ({ venues }) => {
  const [isCreateVenueOpen, toggleCreateVenue] = useToggle();

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-serif font-bold text-xl">
          Active Venues ({venues && venues.length})
        </h2>
        <button
          className="btn flex items-center gap-2"
          onClick={toggleCreateVenue}
        >
          <TbHomePlus size={20} />
          New venue
        </button>
      </div>
      {isCreateVenueOpen && (
        <VenueForm mode={'create'} venue={{}} handleClose={toggleCreateVenue} />
      )}
      {venues && venues.length > 0 ? (
        <div>
          <div className="grid grid-cols-5 gap-5">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>
      ) : (
        <div>You have no active venues</div>
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
  venueManager: PropTypes.bool,
};
