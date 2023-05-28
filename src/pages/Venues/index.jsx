import React from 'react';
import VenuesList from '../../components/VenuesList';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHelmet from '../../components/SEOHelmet';

export const Venues = () => {
  return (
    <>
      <SEOHelmet
        title={'Venues | Holidaze'}
        description={
          'Explore a diverse selection of unique accommodations available worldwide on Holidaze. From beachside retreats to city escapes, find the perfect place for your next adventure!'
        }
      />
      <main className="main-layout">
        <Breadcrumbs page={'Venues'} />
        <VenuesList />
      </main>
    </>
  );
};
