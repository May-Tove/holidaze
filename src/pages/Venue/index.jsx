import React from 'react';
import { Helmet } from 'react-helmet-async';
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
    <>
      <Helmet>
        <title>{`${data.name} - Holidaze`}</title>
        <meta
          name="description"
          content={`Discover ${data.name}, a venue located in ${data.location?.city}. Book with Holidaze today for an unforgettable travel experience!`}
        />
      </Helmet>
      <main className="main-layout">
        <VenueDetails venue={data} />
      </main>
    </>
  );
};
