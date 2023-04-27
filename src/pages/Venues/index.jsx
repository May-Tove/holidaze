import React from 'react';
import VenuesList from '../../components/VenuesList';
import Filters from '../../components/Filters';

export const Venues = () => {
  return (
    <main className="w-5/6 m-auto lg:w-4/5 flex flex-col lg:flex-row gap-5">
      <Filters />
      <VenuesList />
    </main>
  );
};
