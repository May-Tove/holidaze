import { useEffect, useState } from 'react';
import { parseISO, eachDayOfInterval } from 'date-fns';

const useDisableCalendarDates = ({ bookings }) => {
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    const disabledDatesArray =
      (bookings &&
        bookings.flatMap((booking) => {
          try {
            const startDate = parseISO(booking.dateFrom);
            const endDate = parseISO(booking.dateTo);
            const datesBetween = eachDayOfInterval({
              start: startDate,
              end: endDate,
            });
            return datesBetween;
          } catch (error) {
            console.error(`Error processing booking dates: ${error}`);
            return [];
          }
        })) ||
      [];

    setDisabledDates(disabledDatesArray);
  }, [bookings]);

  return { disabledDates, setDisabledDates };
};

export default useDisableCalendarDates;
