import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import VenueDetailsLoader from '../../components/Loaders/VenueDetailsLoader';
import VenueDetails from '../../components/Venue/VenueDetails';
import { API_VENUE_URL } from '../../shared';

export const Venue = () => {
  let { id } = useParams();

  const { data, isLoading, isError } = useAxiosFetch(
    `${API_VENUE_URL}/${id}?_owner=true&_bookings=true`
  );

  if (isError || !data) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return (
      <main className="main-layout">
        <VenueDetailsLoader />
      </main>
    );
  }

  return (
    <main className="main-layout">
      <VenueDetails venue={data} />
    </main>
  );
};
