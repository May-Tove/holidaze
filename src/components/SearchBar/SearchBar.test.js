import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import SearchBar from './index.jsx';

describe('SearchBar', () => {
  const mockVenues = [
    {
      name: 'Venue 1',
      location: {
        city: 'City 1',
        country: 'Country 1',
      },
    },
    {
      name: 'Venue 2',
      location: {
        city: 'City 2',
        country: 'Country 2',
      },
    },
  ];

  it('allows users to search for a venue', async () => {
    // Note the async keyword
    const setSearchResults = jest.fn();
    render(
      <SearchBar
        venues={mockVenues}
        setSearchResults={setSearchResults}
        setFilters={jest.fn()}
        guestNumber={2}
        toggleFilters={jest.fn()}
      />
    );

    const searchInput = screen.getByLabelText(
      'Search for city, country or venue name'
    );

    // Simulate user input in the search input field
    fireEvent.change(searchInput, { target: { value: 'City 1' } });

    // Use waitFor to wait until the setSearchResults has been called
    await waitFor(() =>
      // Assert that setSearchResults function is called with the filtered venues
      expect(setSearchResults).toHaveBeenCalledWith([
        {
          name: 'Venue 1',
          location: {
            city: 'City 1',
            country: 'Country 1',
          },
        },
      ])
    );
  });
});
