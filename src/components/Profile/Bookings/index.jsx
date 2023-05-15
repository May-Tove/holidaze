import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { eachDayOfInterval, parseISO } from 'date-fns';

export const Bookings = ({ bookings }) => {
  const currentDate = new Date();

  // Filter out bookings with a departure date in the past
  const filteredBookings = bookings.filter(
    (booking) => new Date(booking.dateTo) >= currentDate
  );

  // Sort the filtered bookings by the arrival date closest to today
  const sortedBookings = filteredBookings.sort((a, b) => {
    const dateA = new Date(a.dateFrom);
    const dateB = new Date(b.dateFrom);
    return Math.abs(dateA - currentDate) - Math.abs(dateB - currentDate);
  });

  const calculateNumberOfNights = (dateFrom, dateTo) => {
    const startDate = parseISO(dateFrom);
    const endDate = parseISO(dateTo);
    const datesBetween = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
    return datesBetween.length - 1; // Exclude the arrival day
  };

  const calculateTotalPrice = (booking) => {
    const pricePerNight = booking.venue.price;
    const numberOfNights = calculateNumberOfNights(
      booking.dateFrom,
      booking.dateTo
    );
    const totalPrice = pricePerNight * numberOfNights;
    return totalPrice;
  };

  return (
    <>
      <h2 className="text-xl font-serif font-bold mb-4">
        Confirmed bookings ({sortedBookings.length})
      </h2>
      {sortedBookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-5">
          {sortedBookings.map((booking, index) => (
            <Link
              to={`/venue/${booking.venue.id}`}
              key={index}
              className="flex  flex-col md:flex-row gap-3 bg-gray-100  drop-shadow rounded-lg min-h-[200px] md:max-h-[290px]"
            >
              <div className="max-h-[290px] md:min-w-[300px] md:max-w-[300px] ">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={booking.venue.media[0]}
                  alt={booking.venue.name}
                />
              </div>
              <div className="p-4 w-full">
                <div className="flex w-full items-center justify-between mb-5">
                  <h3 className="font-serif font-bold capitalize text-xl ">
                    {booking.venue.name}
                  </h3>
                  <button className="bg-pink-100 text-red-500 p-2 rounded text-sm">
                    Cancel Booking
                  </button>
                </div>

                <div className="flex gap-10">
                  <div className="flex flex-col gap-1">
                    <span>Arrival</span>
                    <span>Nights</span>
                    <span>Departure</span>
                    <span>Guests</span>
                    <span>Price</span>
                    <span>Address</span>
                    <span>Booking number</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span>
                      {new Date(booking.dateFrom).toLocaleDateString()}
                    </span>
                    <span>
                      {calculateNumberOfNights(
                        booking.dateFrom,
                        booking.dateTo
                      )}
                    </span>
                    <span>{new Date(booking.dateTo).toLocaleDateString()}</span>
                    <span>{booking.guests} Adults</span>
                    <span>
                      NOK {booking.venue.price} / Night | Total NOK
                      {calculateTotalPrice(booking)}
                    </span>
                    <span>
                      {booking.venue.location.address},{' '}
                      {booking.venue.location.city},{' '}
                      {booking.venue.location.country}
                    </span>
                    <span>{booking.id}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>You have no upcoming bookings</p>
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
