import { differenceInCalendarDays } from 'date-fns';

/**
 * Calculates the number of nights between two dates.
 *
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {number} The number of nights between the start and end dates.
 */
export const calculateNights = (startDate, endDate) => {
  const nights = differenceInCalendarDays(endDate, startDate);
  return nights;
};

/**
 * Calculates the total price based on the number of nights and the price per night.
 *
 * @param {number} nights - The number of nights.
 * @param {string} price - The price per night as a string with a dollar sign and commas.
 * @returns {string} The total price as a string with a dollar sign and two decimal places.
 */
export const calculateTotalPrice = (nights, price) => {
  const priceWithoutDollarSign = price.replace(/[$,]/g, '');
  const priceAsNumber = parseFloat(priceWithoutDollarSign);
  const total = nights * priceAsNumber;
  return total.toFixed(2);
};
