import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProfileBookings from '../ProfileBookings/index';
import ProfileVenues from '../ProfileVenues';
import VenueReservations from '../VenueReservations';

/**
 * A component that renders the content of a tab in the user profile page.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.venues - An array of venues to display.
 * @param {string} props.name - The name of the user.
 * @param {Array} props.bookings - An array of bookings to display.
 * @param {boolean} props.isOwnProfile - A boolean indicating whether the profile being viewed is the user's own profile.
 * @param {boolean} props.venueManager - A boolean indicating whether the user is a venue manager.
 * @returns {JSX.Element} A div element containing the content of a tab in the user profile page.
 */
const RenderTabContent = ({
  venues,
  name,
  bookings,
  isOwnProfile,
  venueManager,
}) => {
  const [selectedTab, setSelectedTab] = useState('venues');

  /**
   * A function to handle tab clicks.
   *
   * @param {string} tab - The name of the tab that was clicked.
   */
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  /**
   * A function to render the content of the selected tab.
   *
   * @returns {JSX.Element} The content of the selected tab.
   */
  const renderContent = () => {
    switch (selectedTab) {
      case 'venues':
        return <ProfileVenues venues={venues} isOwnProfile={isOwnProfile} />;
      case 'reservations':
        return <VenueReservations name={name} />;
      case 'bookings':
        return <ProfileBookings bookings={bookings} />;
      default:
        return null;
    }
  };

  return !venueManager && bookings ? (
    <section className="my-20">
      <ProfileBookings bookings={bookings} />
    </section>
  ) : (
    <div>
      <div className="border-b border-gray-300">
        <button
          onClick={() => handleTabClick('venues')}
          className={`p-4 border-b-2 ${
            selectedTab === 'venues'
              ? 'border-primaryDark text-primaryDark '
              : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
          }  `}
        >
          Venues
        </button>
        {isOwnProfile && (
          <>
            <button
              onClick={() => handleTabClick('reservations')}
              className={`p-4 border-b-2 ${
                selectedTab === 'reservations'
                  ? 'border-primaryDark text-primaryDark '
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
              } `}
            >
              Venue Reservations
            </button>

            <button
              onClick={() => handleTabClick('bookings')}
              className={`p-4 border-b-2 ${
                selectedTab === 'bookings'
                  ? 'border-primaryDark text-primaryDark '
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
              } `}
            >
              My Bookings
            </button>
          </>
        )}
      </div>
      <section className="my-10">{renderContent()}</section>
    </div>
  );
};

RenderTabContent.propTypes = {
  venues: PropTypes.array,
  name: PropTypes.string,
  bookings: PropTypes.array,
  isOwnProfile: PropTypes.bool,
  venueManager: PropTypes.bool,
};

export default RenderTabContent;
