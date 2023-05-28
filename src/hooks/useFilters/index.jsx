import { useState, useEffect } from 'react';

/**
 * A custom hook for filtering data based on search results and user-selected filters.
 *
 * @param {Array} data - An array of venue objects containing the venue's price, rating, and meta information.
 * @param {Array} searchResults - An array of venue objects containing the search results.
 * @returns {Object} An object containing the filters object, a function to set the filters, the filtered data array, and the minimum and maximum prices.
 * @property {Object} filters - An object containing the user-selected filters.
 * @property {Function} setFilters - A function to set the filters object.
 * @property {Array} filteredData - An array of venue objects containing the filtered search results.
 * @property {number} minPrice - The minimum price of all the venues in the data array.
 * @property {number} maxPrice - The maximum price of all the venues in the data array.
 */
const useFilters = (data, searchResults) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [filters, setFilters] = useState({
    breakfast: false,
    pets: false,
    wifi: false,
    parking: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    priceRange: {
      min: minPrice,
      max: maxPrice,
    },
    guests: 1,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const newMinPrice = Math.min(...data.map((venue) => venue.price));
      const newMaxPrice = Math.max(...data.map((venue) => venue.price));
      setMinPrice(newMinPrice);
      setMaxPrice(newMaxPrice);
      setFilters((prevState) => ({
        ...prevState,
        priceRange: {
          min: newMinPrice,
          max: newMaxPrice,
        },
      }));
    }
  }, [data]);

  const filteredData = searchResults.filter((venue) => {
    return (
      (!filters.breakfast || venue.meta.breakfast === true) &&
      (!filters.pets || venue.meta.pets === true) &&
      (!filters.wifi || venue.meta.wifi === true) &&
      (!filters.parking || venue.meta.parking === true) &&
      ((!filters['1'] &&
        !filters['2'] &&
        !filters['3'] &&
        !filters['4'] &&
        !filters['5']) ||
        filters[venue.rating]) &&
      (filters.priceRange === null ||
        (venue.price >= filters.priceRange.min &&
          venue.price <= filters.priceRange.max)) &&
      (filters.guests === 0 || venue.maxGuests >= parseInt(filters.guests))
    );
  });

  return { filters, setFilters, filteredData, minPrice, maxPrice };
};

export default useFilters;
