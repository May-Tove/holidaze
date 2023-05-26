import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Location from '../../Venue/Location';
import { TbCalendar, TbTags } from 'react-icons/tb';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsPeople, BsMoonStars } from 'react-icons/bs';
import Rating from '../../Venue/Rating';
import useBookingCalculations from '../../../hooks/useBookingCalculation';
import sortBookingsByDate from '../../../utilities/sortBookingsByDate';

export const Bookings = ({ bookings }) => {
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
              <Link to={`/venue/${venue.id}`} key={i} className="bookingCard">
                <div className="min-h-[200px] max-h-full md:w-[400px] overflow-hidden rounded-2xl">
                  <img src={venue.media[0]} alt={venue.name} />
                  <div className="absolute top-2 left-2">
                    <Rating rating={venue.rating} />
                  </div>
                </div>
                <div className="p-4 w-full">
                  <div className="space-y-2">
                    <div className="flex w-full items-start justify-between gap-4 border-b">
                      <div className="pb-3">
                        <h3 className="capitalize ">{venue.name}</h3>
                        <p className="text-xs text-lightGrey">
                          {' '}
                          Booked on{' '}
                          {format(new Date(created), 'EEE MMM dd, yyyy')}
                        </p>
                      </div>

                      <button className="bg-pink-100 text-red-500 p-1 rounded text-sm whitespace-nowrap">
                        Cancel
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <TbCalendar className="min-w-[20px]" size={20} />
                      <p>
                        {format(new Date(dateFrom), 'EEE MMM dd, yyyy')} -{' '}
                        {format(new Date(dateTo), 'EEE MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <BsMoonStars size={20} />
                      <p>
                        {calculateNumberOfNights(dateFrom, dateTo)}
                        <span> Nights</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <BsPeople size={20} />
                      <p>
                        {guests} {guests === 1 ? 'Adult' : 'Adults'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <HiOutlineLocationMarker size={20} />
                      <Location
                        address={venue.location.address}
                        city={venue.location.city}
                        country={venue.location.country}
                      />
                    </div>
                    <div className="lg:absolute lg:bottom-4 lg:right-4">
                      <div className="flex items-center gap-3">
                        <TbTags size={20} />
                        <p>
                          Total price{' '}
                          <span className="font-bold text-primaryDark">
                            {calculateTotalPrice(
                              sortedBookings[i],
                              venue.price
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      ) : (
        <p className="text-lightGrey">You have no upcoming bookings</p>
      )}
    </>
  );
};

Bookings.propTypes = {
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
