import { useState, useEffect } from 'react';

/**
 * useFilters is a custom hook that manages filters for venue data.
 *
 * It keeps track of filter settings for venues,
 * calculates minimum and maximum price from the venues,
 * and filters the search results based on the current filter settings.
 *
 * @param {Array} data - All venues.
 * @param {Array} searchResults - The search results that need to be filtered.
 *
 * @returns {Object} - An object containing the following properties:
 * - filters {Object} - The current filter settings.
 * - setFilters {Function} - Function to update the filter settings.
 * - filteredData {Array} - The filtered search results.
 * - minPrice {number} - The minimum price from the venue data.
 * - maxPrice {number} - The maximum price from the venue data.
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

  // If data exists, it calculates the minimum and maximum price among all venues in the data and set the values to the priceRange in the filters. The 'priceRange' state will now hold the smallest and largest prices among the venues in the data.
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

  // Filters the 'searchResults' array to create a new 'filteredData' array. The filter method loops through each 'venue' in the 'searchResults' array and checks if it meets certain conditions. If the conditions are met, the 'venue' is added to the 'filteredData' array.
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
