import { STATUS_TYPES } from '../../shared/constants';

/**
 * Function to determine the status of a reservation based on the current date and the reservation's start and end dates.
 * @param {Object} reservation - A reservation object.
 * @returns {string} The status of the reservation.
 */
const getStatus = (reservation) => {
  const now = new Date();
  const dateFrom = new Date(reservation.dateFrom);
  const dateTo = new Date(reservation.dateTo);

  if (now < dateFrom) return STATUS_TYPES.CONFIRMED;
  if (now >= dateFrom && now < dateTo) return STATUS_TYPES.IN_HOUSE;
  if (now >= dateTo) return STATUS_TYPES.CHECKED_OUT;
};

export default getStatus;
