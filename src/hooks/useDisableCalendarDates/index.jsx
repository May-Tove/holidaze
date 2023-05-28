import { useEffect, useState } from 'react';
import { parseISO, eachDayOfInterval } from 'date-fns';

/**
 * A custom hook for disabling dates on a calendar based on existing bookings.
 *
 * @param {Object} options - An object containing the bookings array.
 * @param {Array} options.bookings - An array of bookings containing the arrival and departure dates.
 * @returns {Object} An object containing the disabled dates array and a function to set the disabled dates.
 * @property {Array} disabledDates - An array of dates to be disabled on the calendar.
 * @property {Function} setDisabledDates - A function to set the disabled dates array.
 */
const useDisableCalendarDates = ({ bookings }) => {
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    const disabledDatesArray =
      (bookings &&
        bookings.flatMap((booking) => {
          const startDate = parseISO(booking.dateFrom);
          const endDate = parseISO(booking.dateTo);
          const datesBetween = eachDayOfInterval({
            start: startDate,
            end: endDate,
          });
          return datesBetween;
        })) ||
      [];

    setDisabledDates(disabledDatesArray);
  }, [bookings]);

  return { disabledDates, setDisabledDates };
};

export default useDisableCalendarDates;
