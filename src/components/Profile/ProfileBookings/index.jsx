import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './ProfileBookings.css';
import useBookingCalculations from '../../../hooks/useBookingCalculation';
import Location from '../../Venue/Location';
import { TbCalendar, TbTags } from 'react-icons/tb';
import { BsPeople, BsMoonStars } from 'react-icons/bs';
import { sortBookingsByDate } from '../../../utilities';

/**
 * A component that renders a list of upcoming bookings.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.bookings - An array of booking objects.
 * @returns {JSX.Element} A list of booking cards, each containing information about the venue, booking dates, number of nights, number of guests, location, and total price.
 */
export const ProfileBookings = ({ bookings }) => {
  const currentDate = new Date();

  // Filter out bookings with a departure date in the past
  const filteredBookings = bookings.filter(
    (booking) => new Date(booking.dateTo) >= currentDate
  );

  // Sort the filtered bookings by the arrival date closest to today
  const sortedBookings = sortBookingsByDate(filteredBookings);

  const { calculateNumberOfNights, calculateTotalPrice } =
    useBookingCalculations();

  return (
    <>
      <h2 className="mb-4" data-testid="upcoming-bookings-heading">
        Your upcoming stays ({sortedBookings.length})
      </h2>
      {sortedBookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-5" data-testid="upcoming-bookings">
          {sortedBookings.map(
            ({ venue, dateFrom, dateTo, guests, created }, i) => (
              <Link to={`/venue/${venue.id}`} key={i} className="booking-card">
                <div className="h-[240px] overflow-hidden rounded-2xl md:w-[600px]">
                  <img src={venue.media[0]} alt={venue.name} />
                </div>
                <div className="space-y-2 p-5 w-full">
                  <div className="pb-5 border-b">
                    <h3>{venue.name}</h3>
                    <p className="text-xs text-lightGrey">
                      {' '}
                      Booked on {format(new Date(created), 'EEE MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <TbCalendar
                      className="min-w-[20px]"
                      size={20}
                      aria-label="Calendar icon"
                    />
                    <p>
                      {format(new Date(dateFrom), 'EEE MMM dd, yyyy')} -{' '}
                      {format(new Date(dateTo), 'EEE MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <BsMoonStars size={20} aria-label="Moon icon" />
                    <p>
                      {calculateNumberOfNights(dateFrom, dateTo)}
                      <span> Nights</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <BsPeople size={20} aria-label="People icon" />
                    <p>
                      {guests} {guests === 1 ? 'Adult' : 'Adults'}
                    </p>
                  </div>
                  <Location
                    address={venue.location.address}
                    city={venue.location.city}
                    country={venue.location.country}
                  />
                  <div className="lg:absolute lg:bottom-4 lg:right-4">
                    <div className="flex items-center gap-3">
                      <TbTags size={20} aria-label="Tag icon" />
                      <p>
                        Total price{' '}
                        <span className="text-semibold text-bluePop">
                          {calculateTotalPrice(sortedBookings[i], venue.price)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      ) : (
        <p className="no-results-message">You have no upcoming bookings</p>
      )}
    </>
  );
};

ProfileBookings.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      venue: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        media: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
      guests: PropTypes.number.isRequired,
    })
  ),
};
