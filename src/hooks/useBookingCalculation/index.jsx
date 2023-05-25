import { eachDayOfInterval, parseISO } from 'date-fns';
import formatCurrency from '../../shared/formatCurrency';

/**
 * Custom hook to calculate number of nights for a reservation or booking and the total price based on how many nights are booked or reserved.
 * @returns {Object} An object containing:
 *
 *  - calculateNumberOfNights: Function to calculate the number of nights between two dates.
 * @param {string} dateFrom - Start date of the booking, formatted as an ISO date string.
 * @param {string} dateTo - End date of the booking, formatted as an ISO date string.
 * @returns {number} Number of nights between dateFrom and dateTo.
 *
 *  - calculateTotalPrice: Function to calculate the total price of a booking.
 * @param {Object} booking - A booking object containing at least the dateFrom and dateTo properties.
 * @param {number} price - The price per night.
 * @returns {string} Total price of the booking, formatted as currency.
 */
const useBookingCalculations = () => {
  const calculateNumberOfNights = (dateFrom, dateTo) => {
    const startDate = parseISO(dateFrom);
    const endDate = parseISO(dateTo);
    const datesBetween = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
    return datesBetween.length - 1; // Exclude the arrival day
  };

  const calculateTotalPrice = (booking, price) => {
    const nights = calculateNumberOfNights(booking.dateFrom, booking.dateTo);
    const totalPrice = nights * price;
    const formatTotalPrice = formatCurrency(totalPrice);
    return formatTotalPrice;
  };

  return { calculateNumberOfNights, calculateTotalPrice };
};

export default useBookingCalculations;
