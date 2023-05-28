import { useState } from 'react';
import { parseISO } from 'date-fns';
import { STATUS_TYPES } from '../../shared';

/**
 * A custom React hook that filters and sorts an array of reservations based on status and venue.
 *
 * @param {Array} reservations - An array of reservation objects to filter and sort.
 * @returns {Object} An object containing the filtered reservations, status filter, status filter setter, venue sort, and venue sort setter.
 */
const useReservationFilterAndSort = (reservations) => {
  const [statusFilter, setStatusFilter] = useState(STATUS_TYPES.All);
  const [sortVenue, setSortVenue] = useState(STATUS_TYPES.ALL);
  const currentDate = new Date();

  const filteredReservations = reservations.filter((booking) => {
    const isVenueMatch =
      sortVenue === STATUS_TYPES.ALL || booking.venueName === sortVenue;
    switch (statusFilter) {
      case STATUS_TYPES.CONFIRMED:
        return isVenueMatch && parseISO(booking.dateFrom) > currentDate;
      case STATUS_TYPES.IN_HOUSE:
        return (
          isVenueMatch &&
          parseISO(booking.dateFrom) <= currentDate &&
          parseISO(booking.dateTo) > currentDate
        );
      case STATUS_TYPES.CHECKED_OUT:
        return isVenueMatch && parseISO(booking.dateTo) <= currentDate;
      default:
        return isVenueMatch;
    }
  });

  return {
    filteredReservations,
    statusFilter,
    setStatusFilter,
    sortVenue,
    setSortVenue,
  };
};

export default useReservationFilterAndSort;
