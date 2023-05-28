const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
});

/**
 * Formats a number as a currency string using the United States Dollar (USD) currency format.
 *
 * @param {number} number - The number to format as currency.
 * @returns {string} The formatted currency string.
 *
 * @example
 * const price = 1234.56;
 * const formattedPrice = formatCurrency(price); // "$1,234.56"
 */
export const formatCurrency = (number) => {
  return CURRENCY_FORMATTER.format(number);
};
