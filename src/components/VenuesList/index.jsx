import React from 'react';
import useApi from '../../hooks/useApi';
import VenueSkeletonLoader from '../VenueSkeletonLoader';
import VenueCard from '../VenueCard';
import API_URL from '../../shared/url';

const VenuesList = () => {
  const { venues, isLoading, isError } = useApi(API_URL);

  if (isError) {
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

  if (venues.length === 0) {
    return (
      <div>
        <h3>No results</h3>
      </div>
    );
  }

  return (
    <section className="py-40 w-full m-auto">
      <div className="grid grid-cols-2 gap-4">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </section>
  );
};

export default VenuesList;
