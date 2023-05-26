import { useState } from 'react';
import { parseISO } from 'date-fns';
import { STATUS_TYPES } from '../../shared/constants';

/**
 * Custom hook to filter and sort reservations based on status and venue.
 * @param {Array<Object>} reservations - Array of reservations to be filtered and sorted.
 * @returns {Object} An object containing:
 *  - filteredReservations: Array of reservations filtered and sorted based on status and venue.
 *  - statusFilter: Current status filter.
 *  - setStatusFilter: Function to update status filter.
 *  - sortVenue: Current sort venue.
 *  - setSortVenue: Function to update sort venue.
 */
const useReservationFilterAndSort = (reservations) => {
  const [statusFilter, setStatusFilter] = useState(STATUS_TYPES.All);
  const [sortVenue, setSortVenue] = useState(STATUS_TYPES.ALL);
  const currentDate = new Date();

  const filteredReservations = reservations.filter((booking) => {
    const isVenueMatch =
      sortVenue === STATUS_TYPES.ALL || booking.venueName === sortVenue;
    if (statusFilter === STATUS_TYPES.CONFIRMED) {
      return isVenueMatch && parseISO(booking.dateFrom) > currentDate;
    } else if (statusFilter === STATUS_TYPES.IN_HOUSE) {
      return (
        isVenueMatch &&
        parseISO(booking.dateFrom) <= currentDate &&
        parseISO(booking.dateTo) > currentDate
      );
    } else if (statusFilter === STATUS_TYPES.CHECKED_OUT) {
      return isVenueMatch && parseISO(booking.dateTo) <= currentDate;
    }
    return isVenueMatch;
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
