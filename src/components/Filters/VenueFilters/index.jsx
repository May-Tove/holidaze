import React from 'react';
import PropTypes from 'prop-types';
import { CgClose } from 'react-icons/cg';
import CheckboxInput from '../CheckboxInput';

/**
 * Filters Component
 *
 * A filter component for setting filters on venues.
 * @param {Object} filters - The current filters state
 * @param {function} setFilters - Function to set the filters state
 * @param {number} minPrice - The minimum price allowed for price filter
 * @param {number} maxPrice - The maximum price allowed for price filter
 * @param {function} toggleFilters - Function to toggle the filter display
 * @example
 * <Filters
 *   filters={filters}
 *   setFilters={setFilters}
 *   minPrice={minPrice}
 *   maxPrice={maxPrice}
 *   toggleFilters={toggleFilters}
 * />
 */
const Filters = ({
  filters,
  setFilters,
  minPrice,
  maxPrice,
  toggleFilters,
}) => {
  const amenities = [
    { name: 'breakfast', label: 'Breakfast included' },
    { name: 'pets', label: 'Pets allowed' },
    { name: 'wifi', label: 'Free Wi-Fi' },
    { name: 'parking', label: 'Parking' },
  ];
  const ratings = ['1', '2', '3', '4', '5'];

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      priceRange: {
        min:
          name === 'min'
            ? parseInt(value) || minPrice
            : prevState.priceRange?.min || minPrice,
        max:
          name === 'max'
            ? parseInt(value) || maxPrice
            : prevState.priceRange?.max || maxPrice,
      },
    }));
  };

  const handleClearFilter = () => {
    setFilters({
      breakfast: false,
      pets: false,
      wifi: false,
      parking: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      priceRange: { min: minPrice, max: maxPrice },
      guests: 1,
    });
  };

  return (
    <section className="modal overflow-y-auto">
      <div className="modal-body flex flex-col">
        <div className="w-full flex items-center justify-between border-b pb-5">
          <h2>Filters</h2>
          <button
            className="icon-btn flex items-center text-sm gap-1"
            onClick={handleClearFilter}
          >
            <CgClose size={15} />
            Clear Filters
          </button>
        </div>
        <form className="py-5">
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Amenities</p>
            {amenities.map((amenity) => (
              <CheckboxInput
                key={amenity.name}
                name={amenity.name}
                checked={filters[amenity.name]}
                onChange={handleCheckboxChange}
                label={amenity.label}
              />
            ))}
            <p className="font-semibold mt-5">Rating</p>
            {ratings.map((rating) => (
              <CheckboxInput
                key={rating}
                name={rating}
                checked={filters[rating]}
                onChange={handleCheckboxChange}
                label={`${rating} star${rating > 1 ? 's' : ''}`}
              />
            ))}
            <p className="font-semibold mt-5">Price Range</p>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  className="floating-input peer"
                  type="number"
                  name="min"
                  value={filters.priceRange ? filters.priceRange.min : ''}
                  min={0}
                  onChange={handlePriceRangeChange}
                  placeholder=" "
                />
                <label className="floating-label" htmlFor={'min'}>
                  Min
                </label>
              </div>
              <span>-</span>
              <div className="relative">
                <input
                  className="floating-input peer"
                  type="number"
                  name="max"
                  value={filters.priceRange ? filters.priceRange.max : ''}
                  min={0}
                  onChange={handlePriceRangeChange}
                  placeholder=" "
                />
                <label className="floating-label" htmlFor={'max'}>
                  Max
                </label>
              </div>
            </div>
          </div>
        </form>
        <div className="flex items-center gap-3 pt-5 border-t w-full">
          <button className="btn w-full" onClick={toggleFilters}>
            Show results
          </button>
          <button className="btn-secondary w-full" onClick={toggleFilters}>
            Close
          </button>
        </div>
      </div>
    </section>
  );
};

Filters.propTypes = {
  filters: PropTypes.shape({
    breakfast: PropTypes.bool,
    pets: PropTypes.bool,
    wifi: PropTypes.bool,
    parking: PropTypes.bool,
    1: PropTypes.bool,
    2: PropTypes.bool,
    3: PropTypes.bool,
    4: PropTypes.bool,
    5: PropTypes.bool,
    priceRange: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }),
    guests: PropTypes.number,
  }).isRequired,
  setFilters: PropTypes.func,
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
  toggleFilters: PropTypes.func,
};

export default Filters;
