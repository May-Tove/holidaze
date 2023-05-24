import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor, screen } from '@testing-library/react';
import VenuesList from './index.jsx';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useFilters from '../../hooks/useFilters';

jest.mock('../../hooks/useAxiosFetch', () => jest.fn());
jest.mock('../../hooks/useFilters', () => jest.fn());

const mockVenueData = [
  {
    id: '1',
    name: 'Venue 1',
    location: {
      city: 'City 1',
      country: 'Country 1',
    },
    price: 100,
    media: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      // ...
    ],
  },
  {
    id: '2',
    name: 'Venue 2',
    location: {
      city: 'City 2',
      country: 'Country 2',
    },
    price: 200,
    media: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      // ...
    ],
  },
  // Add more venue objects as needed
];

describe('VenuesList', () => {
  beforeEach(() => {
    useAxiosFetch.mockReturnValue({
      data: [...mockVenueData], // Use the actual test data here
      searchResults: [...mockVenueData],
      setSearchResults: jest.fn(),
      isLoading: false,
      isError: false,
      fetchError: null,
    });

    useFilters.mockReturnValue({
      filters: { guests: 2 }, // Provide mock filters for testing
      setFilters: jest.fn(),
      filteredData: [...mockVenueData], // Use the actual test data here
      minPrice: 0,
      maxPrice: 100,
    });
  });

  it('displays the list of venues', async () => {
    render(
      <MemoryRouter>
        <VenuesList />
      </MemoryRouter>
    );

    // Wait for the component to finish loading (optional if not using async/await)
    await waitFor(() => {
      // Assert that the venues are rendered
      const venueCards = screen.getAllByTestId('venue-card');
      expect(venueCards.length).toBe(mockVenueData.length);
    });
  });
});
