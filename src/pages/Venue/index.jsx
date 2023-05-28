import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import VenueDetailsLoader from '../../components/Loaders/VenueDetailsLoader';
import VenueDetails from '../../components/Venue/VenueDetails';
import { API_VENUE_URL } from '../../shared';
import Breadcrumbs from '../../components/Breadcrumbs';
import ErrorMessage from '../../components/ErrorMessage';
import SEOHelmet from '../../components/SEOHelmet';

export const Venue = () => {
  let { id } = useParams();

  const { fetchApi, isLoading, isError, errorMessage, data } = useApi();

  const fetchData = useCallback(async () => {
    await fetchApi(`${API_VENUE_URL}/${id}?_owner=true&_bookings=true`);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if ((isLoading && !data) || Array.isArray(data)) {
    return (
      <main className="main-layout">
        <VenueDetailsLoader />
      </main>
    );
  }

  if (isError) {
    return <ErrorMessage message={errorMessage} />;
  }

  return (
    <>
      <SEOHelmet
        title={`${data.name} | Holidaze`}
        description={`Discover ${data.name}, a venue located in ${data.location?.city}. Book with Holidaze today for an unforgettable travel experience!`}
      />
      <main className="main-layout">
        <Breadcrumbs page={'venue'} venueName={data.name} />
        <VenueDetails venue={data} />
      </main>
    </>
  );
};
