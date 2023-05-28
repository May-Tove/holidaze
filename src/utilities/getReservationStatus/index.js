import { STATUS_TYPES } from '../../shared/constants';

/**
 * Function to determine the status of a reservation based on the current date and the reservation's start and end dates.
 * @param {Object} reservation - A reservation object.
 * @returns {string} The status of the reservation.
 */
export const getReservationStatus = (reservation) => {
  const now = new Date();
  const dateFrom = new Date(reservation.dateFrom);
  const dateTo = new Date(reservation.dateTo);

  switch (true) {
    case now < dateFrom:
      return STATUS_TYPES.CONFIRMED;
    case now >= dateFrom && now < dateTo:
      return STATUS_TYPES.IN_HOUSE;
    case now >= dateTo:
      return STATUS_TYPES.CHECKED_OUT;
    default:
      return null;
  }
};
