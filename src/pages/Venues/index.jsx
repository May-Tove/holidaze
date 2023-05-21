import React from 'react';
import { Helmet } from 'react-helmet-async';
import VenuesList from '../../components/Venues';

export const Venues = () => {
  return (
    <>
      <Helmet>
        <title>Venues | Holidaze</title>
        <meta
          name="description"
          content="Explore a diverse selection of unique accommodations available worldwide on Holidaze. From beachside retreats to city escapes, find the perfect place for your next adventure!"
        />
      </Helmet>
      <main className="main-layout">
        <VenuesList />
      </main>
    </>
  );
};
