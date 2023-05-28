import { eachDayOfInterval, parseISO } from 'date-fns';
import { formatCurrency } from '../../utilities';

/**
 * A custom hook for calculating the number of nights and total price for a booking.
 *
 * @returns {Object} An object containing functions for calculating the number of nights and total price for a booking.
 * @property {Function} calculateNumberOfNights - A function that calculates the number of nights between two dates.
 * @property {Function} calculateTotalPrice - A function that calculates the total price for a booking.
 */
const useBookingCalculations = () => {
  /**
   * Function to calculate the number of nights between two dates.
   * @param {string} dateFrom - Start date of the booking, formatted as an ISO date string.
   * @param {string} dateTo - End date of the booking, formatted as an ISO date string.
   * @returns {number} Number of nights between dateFrom and dateTo.
   */
  const calculateNumberOfNights = (dateFrom, dateTo) => {
    const startDate = parseISO(dateFrom);
    const endDate = parseISO(dateTo);
    const datesBetween = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
    return datesBetween.length - 1; // Exclude the arrival day
  };

  /**
   *Function to calculate the total price of a booking.
   * @param {Object} booking - A booking object containing at least the dateFrom and dateTo properties.
   * @param {number} price - The price per night.
   * @returns {string} Total price of the booking, formatted as currency.
   */
  const calculateTotalPrice = (booking, price) => {
    const nights = calculateNumberOfNights(booking.dateFrom, booking.dateTo);
    const totalPrice = nights * price;
    const formatTotalPrice = formatCurrency(totalPrice);
    return formatTotalPrice;
  };

  return { calculateNumberOfNights, calculateTotalPrice };
};

export default useBookingCalculations;
