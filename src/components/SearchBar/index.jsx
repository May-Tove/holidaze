import React from 'react';
import PropTypes from 'prop-types';
import { BsSliders } from 'react-icons/bs';

/**
 * SearchBar Component
 *
 * A search bar component for searching venues and setting guest filters.
 *
 * @component
 * @param {Object[]} venues - The array of venues available to search
 * @param {function} setSearchResults - Function to set the search results
 * @param {function} setFilters - Function to set the number of guests
 * @param {number} guestNumber - The number of guests
 * @param {function} toggleFilters - Function to toggle the filter display
 */
const SearchBar = ({
  venues,
  setSearchResults,
  setFilters,
  guestNumber,
  toggleFilters,
}) => {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    const resultsArray = venues.filter(
      (venue) =>
        venue.name.toLowerCase().includes(query) ||
        venue.location.city.toLowerCase().includes(query) ||
        venue.location.country.toLowerCase().includes(query)
    );
    setSearchResults(resultsArray);
  };

  const handleGuestsChange = (e) => {
    const { value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      guests: parseInt(value) || 1,
    }));
  };

  return (
    <section className="w-full mb-5 m-auto">
      <h1 className="mb-5">Where would you like to go?</h1>

      <form
        className="bg-white rounded-2xl p-5 flex flex-col items-center gap-3 w-full md:flex-row"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full">
          <input
            id="search"
            className="floating-input peer"
            type="search"
            name="search"
            placeholder=" "
            onChange={handleSearchChange}
          />
          <label className="floating-label" htmlFor="search">
            Search for city, country or venue name
          </label>
        </div>
        <div className="flex items-center gap-3 w-full">
          <div className="relative w-full">
            <input
              className="floating-input peer"
              type="number"
              name="guests"
              value={guestNumber}
              min={1}
              onChange={handleGuestsChange}
              placeholder=" "
            />
            <label className="floating-label" htmlFor={'guests'}>
              Number of Guests
            </label>
          </div>

          <button
            className="btn flex items-center gap-3"
            onClick={toggleFilters}
            type="button"
          >
            <BsSliders size={20} /> Filters
          </button>
        </div>
      </form>
    </section>
  );
};

SearchBar.propTypes = {
  venues: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      location: PropTypes.shape({
        city: PropTypes.string,
        country: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
  setSearchResults: PropTypes.func,
  setFilters: PropTypes.func,
  guestNumber: PropTypes.number,
  toggleFilters: PropTypes.func,
};

export default SearchBar;
