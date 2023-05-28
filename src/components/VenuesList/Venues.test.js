import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor, screen } from '@testing-library/react';
import VenuesList from './index.jsx';
import useApi from '../../hooks/useApi';
import useFilters from '../../hooks/useFilters';

jest.mock('../../hooks/useApi', () => jest.fn());
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
    media: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  },
  {
    id: '2',
    name: 'Venue 2',
    location: {
      city: 'City 2',
      country: 'Country 2',
    },
    price: 200,
    media: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  },
];

describe('VenuesList', () => {
  beforeEach(() => {
    useApi.mockReturnValue({
      data: [...mockVenueData],
      searchResults: [...mockVenueData],
      setSearchResults: jest.fn(),
      isLoading: false,
      isError: false,
      fetchError: null,
      fetchApi: jest.fn().mockResolvedValue(),
    });

    useFilters.mockReturnValue({
      filters: { guests: 2 },
      setFilters: jest.fn(),
      filteredData: [...mockVenueData],
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

    // Wait for the component to finish loading
    await waitFor(() => {
      // Assert that the venues are rendered
      const venueCards = screen.getAllByTestId('venue-card');
      expect(venueCards.length).toBe(mockVenueData.length);
    });
  });
});
