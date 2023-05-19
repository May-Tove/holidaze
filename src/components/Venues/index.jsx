import React from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { API_VENUE_URL } from '../../shared';
import AllVenuesLoader from '../Loaders/AllVenuesLoader';
import VenueCard from '../VenueCard';

const VenuesList = () => {
  const { data, isLoading, isError } = useAxiosFetch(
    `${API_VENUE_URL}?_owner=true&sort=created&sortOrder=desc`,
    'get'
  );

  console.log(data);

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <AllVenuesLoader />;
  }

  if (data.length === 0) {
    return (
      <div>
        <h3>No results</h3>
      </div>
    );
  }

  return (
    <section className="w-full m-auto">
      <div className="grid grid-cols-3 gap-4">
        {data.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </section>
  );
};

export default VenuesList;
