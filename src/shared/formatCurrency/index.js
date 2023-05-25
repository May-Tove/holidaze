const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
});

/**
 * Formats a number as a currency string using the Norwegian Krone (NOK) currency format.
 * @param {number} number - The number to format as currency.
 * @returns {string} string - The formatted currency string.
 * @example
 * const price = 1234.56;
 * const formattedPrice = formatCurrency(price); // "kr 1 234,56"
 */
const formatCurrency = (number) => {
  return CURRENCY_FORMATTER.format(number);
};

export default formatCurrency;
