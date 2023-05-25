import React, { useEffect, useCallback } from 'react';
import useApi from '../../hooks/useApi';
import useFilters from '../../hooks/useFilters';
import useToggle from '../../hooks/useToggle';
import VenueCard from '../VenueCard';
import SearchBar from '../SearchBar';
import Filters from '../Filters/VenueFilters';
import AllVenuesLoader from '../Loaders/AllVenuesLoader';
import ErrorMessage from '../../shared/errorMessage';
import { API_VENUE_URL } from '../../shared';

/**
 * VenuesList is a component that displays a list of venues.
 *
 * It fetches data from an API, allows for searching and filtering of the venues,
 * and displays each venue using the `VenueCard` component.
 *
 * If the data is still loading, `AllVenuesLoader` is displayed.
 * If there is an error during fetching, an error message is displayed.
 *
 * It makes use of the `useApi`, `useFilters`, and `useToggle` custom hooks.
 *
 * @returns {React.Element} The rendered VenuesList component.
 */
const VenuesList = () => {
  const [isFiltersOpen, toggleFilters] = useToggle();
  const {
    fetchApi,
    data,
    searchResults,
    setSearchResults,
    isLoading,
    isError,
    errorMessage,
  } = useApi();

  const { filters, setFilters, filteredData, minPrice, maxPrice } = useFilters(
    data,
    searchResults
  );

  const fetchData = useCallback(async () => {
    await fetchApi(`${API_VENUE_URL}?_owner=true&sort=created&sortOrder=desc`);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isError) {
    return <ErrorMessage message={errorMessage} />;
  }

  if (isLoading) {
    return <AllVenuesLoader />;
  }

  return (
    <>
      {isFiltersOpen && (
        <Filters
          filters={filters}
          setFilters={setFilters}
          minPrice={minPrice}
          maxPrice={maxPrice}
          toggleFilters={toggleFilters}
        />
      )}

      <SearchBar
        venues={data}
        setSearchResults={setSearchResults}
        setFilters={setFilters}
        guestNumber={filters.guests}
        toggleFilters={toggleFilters}
      />

      <p className="my-2 text-sm">
        Showing <span className="font-bold">{filteredData.length}</span> of{' '}
        <span className="font-bold">{data.length}</span> venues
      </p>
      <section className="grid grid-cols-3 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))
        ) : (
          <div className="my-7">
            <p className="font-bold text-gray-400">No matching results</p>
          </div>
        )}
      </section>
    </>
  );
};

export default VenuesList;
