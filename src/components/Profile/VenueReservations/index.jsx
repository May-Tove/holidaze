import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import useApi from '../../../hooks/useApi';
import useReservationFilterAndSort from '../../../hooks/useReservationFilterAndSort';
import useBookingCalculations from '../../../hooks/useBookingCalculation';
import { API_PROFILE_URL } from '../../../shared';
import ReservationOverviewLoader from '../../Loaders/ReservationOverviewLoader';
import ErrorMessage from '../../../shared/errorMessage';
import sortBookingsByDate from '../../../utilities/sortBookingsByDate';
import getStatus from '../../../utilities/getStatus';
import { handleErrorImage } from '../../../shared';

/**
 * VenueReservations - A component for displaying reservations made at a logged in venue managers own venues. Reservations can be sorted by venue name or filtered by reservation status
 * @component
 *
 * @param {object} props
 * @param {string} props.name - Profile name to fetch bookings from API.
 *
 * @returns {React.Component} The VenueReservations component.
 *
 * @example
 *
 * import VenueReservations from './VenueReservations';
 *
 * function App() {
 *   return <VenueReservations name='JohnDoe' />;
 * }
 */
export const VenueReservations = ({ name }) => {
  const { fetchApi, data, isLoading, isError, errorMessage } = useApi();

  const fetchData = useCallback(async () => {
    await fetchApi(`${API_PROFILE_URL}/${name}/venues?_bookings=true`);
  }, [name]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Flatten the array of venues and their bookings
  const reservations = data.flatMap((venue) => {
    return venue.bookings.map((booking) => {
      return {
        ...booking,
        venueName: venue.name,
        venuePrice: venue.price,
        venueMedia: venue.media,
      };
    });
  });

  // Get unique venue names for the dropdown
  const venueNames = [...new Set(data.map((venue) => venue.name))];

  // Sort the filtered bookings by the arrival date closest to today
  const sortedReservations = sortBookingsByDate(reservations);

  const { filteredReservations, setStatusFilter, sortVenue, setSortVenue } =
    useReservationFilterAndSort(reservations);

  const { calculateNumberOfNights, calculateTotalPrice } =
    useBookingCalculations();

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleVenueSortChange = (event) => {
    setSortVenue(event.target.value);
  };

  if (isLoading) {
    return <ReservationOverviewLoader />;
  }

  if (isError) {
    return <ErrorMessage message={errorMessage} />;
  }

  if (reservations && reservations.length <= 0) {
    return (
      <div className="text-center pt-20 font-medium text-slate-400">
        No reservations has been made yet
      </div>
    );
  }

  return (
    <>
      <div className="mb-10 pb-5 border-b">
        <h2>Reservation overview ({reservations.length})</h2>
        <p>Keep track of all the reservations at your venues</p>
      </div>

      <div className="flex flex-col justify-between gap-3 my-5 sm:flex-row sm:items-end ">
        <div className="flex gap-1 sm:items-center">
          <div className="flex flex-col text-xs sm:text-sm">
            <label htmlFor="statusSort">Sort by status</label>
            <select
              id="statusSort"
              onChange={(event) => handleStatusFilterChange(event.target.value)}
              className="text-xs rounded-xl border border-slate-300 p-2 shadow-lg bg-white text-slate-500 sm:text-sm"
            >
              <option value="all">All</option>
              <option value="confirmed">Confirmed</option>
              <option value="in-house">In-House</option>
              <option value="checked-out">Checked Out</option>
            </select>
          </div>

          <div className="flex flex-col text-xs sm:text-sm">
            <label htmlFor="venueSort">Sort by venue</label>
            <select
              id="venueSort"
              className="text-xs rounded-xl border border-slate-300 p-2 shadow-lg bg-white text-slate-500 sm:text-sm"
              value={sortVenue}
              onChange={handleVenueSortChange}
            >
              <option value="all">All</option>
              {venueNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-xs sm:text-sm">
          Showing{' '}
          <span className="font-bold">{filteredReservations.length}</span> out
          of <span className="font-bold">{reservations.length}</span>{' '}
          reservations
        </p>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto w-full">
          <div className="inline-block min-w-full">
            <div className="shadow-lg overflow-hidden border-b border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th scope="col" className="table-heading">
                      Arrival
                    </th>
                    <th scope="col" className="table-heading">
                      Nights
                    </th>
                    <th scope="col" className="table-heading">
                      Departure
                    </th>
                    <th scope="col" className="table-heading">
                      Guests
                    </th>
                    <th scope="col" className="table-heading">
                      Total Price
                    </th>
                    <th scope="col" className="table-heading">
                      Status
                    </th>
                    <th scope="col" className="table-heading">
                      Venue
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReservations.length === 0 ? (
                    <tr>
                      <td
                        className="text-center py-10 font-medium text-slate-400"
                        colSpan={7}
                      >
                        Currently no reservations
                      </td>
                    </tr>
                  ) : (
                    filteredReservations.map((booking, i) => (
                      <tr key={i}>
                        <td className="table-content">
                          {format(new Date(booking.dateFrom), 'dd.MM.yyyy')}
                        </td>
                        <td className="table-content">
                          {calculateNumberOfNights(
                            booking.dateFrom,
                            booking.dateTo
                          )}
                        </td>
                        <td className="table-content">
                          {format(new Date(booking.dateTo), 'dd.MM.yyyy')}
                        </td>
                        <td className="table-content">{booking.guests}</td>
                        <td className="table-content">
                          {calculateTotalPrice(
                            sortedReservations[i],
                            booking.venuePrice
                          )}
                        </td>
                        <td className="table-content capitalize">
                          {getStatus(booking)}
                        </td>
                        <td className="table-content flex items-center gap-2">
                          <img
                            className="w-10 h-10 rounded"
                            src={booking.venueMedia[0]}
                            alt={`Image of ${booking.venueName}`}
                            onError={(e) =>
                              handleErrorImage({ e, mode: 'image' })
                            }
                          />
                          <span>{booking.venueName}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

VenueReservations.propTypes = {
  name: PropTypes.string.isRequired,
};
