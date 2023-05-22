import React from 'react';
import { Helmet } from 'react-helmet-async';
import VenuesList from '../../components/Venues';
import Breadcrumbs from '../../components/Breadcrumbs';

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
      <main className="main-layout h-screen">
        <Breadcrumbs page={'Venues'} />
        <VenuesList />
      </main>
    </>
  );
};
