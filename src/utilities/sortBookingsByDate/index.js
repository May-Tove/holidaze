/**
 * Function to sort an array of bookings/reservations based on their start dates compared to the current date.
 * The bookings closest to the current date will be at the start of the sorted array.
 * @param {Array<Object>} bookings - An array of booking objects.
 * @returns {Array<Object>} Sorted array of bookings.
 */
export const sortBookingsByDate = (bookings) => {
  const currentDate = new Date();

  return bookings.sort((a, b) => {
    const dateA = new Date(a.dateFrom);
    const dateB = new Date(b.dateFrom);
    return Math.abs(dateA - currentDate) - Math.abs(dateB - currentDate);
  });
};
