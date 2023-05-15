import React from 'react';
import VenueSkeletonLoader from '../VenueSkeletonLoader';
import VenueCard from '../VenueCard';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { API_VENUE_URL } from '../../shared';

const VenuesList = () => {
  const { data, isLoading, fetchError } = useAxiosFetch(
    `${API_VENUE_URL}?_owner=true`
  );
  console.log(data);

  if (fetchError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return (
      <section className="py-40 w-full m-auto">
        <div className="grid grid-cols-2 gap-4">
          {[...Array(8)].map((_, index) => (
            <VenueSkeletonLoader key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <div>
        <h3>No results</h3>
      </div>
    );
  }

  return (
    <section className="py-40 w-full m-auto">
      <div className="grid grid-cols-2 gap-4">
        {data.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </section>
  );
};

export default VenuesList;
