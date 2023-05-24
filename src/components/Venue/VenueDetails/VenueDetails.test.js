import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VenueDetails from './index.jsx';
import { CreateBooking } from '../../Forms/index.js';
import { useLogin } from '../../../context/LoginProvider';

jest.mock('../../../context/LoginProvider', () => ({
  useLogin: jest.fn(),
}));

const mockVenueData = {
  id: '1',
  name: 'Test Venue',
  description: 'This is a test venue',
  price: 200,
  media: ['test.jpg'],
  rating: 5,
  location: {
    address: 'Test street',
    city: 'Test city',
    country: 'Test country',
  },
  maxGuests: 5,
  bookings: [],
  owner: { name: 'Test Owner', avatar: 'test.jpg', email: 'test@test.com' },
};

describe('Venue Details', () => {
  beforeEach(() => {
    useLogin.mockReturnValue({
      profile: { name: 'Test Owner' },
      isLoggedIn: true,
    });
  });

  it('displays venue details', async () => {
    render(
      <MemoryRouter>
        <VenueDetails venue={mockVenueData} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Venue')).toBeInTheDocument();
      expect(screen.getByText('This is a test venue')).toBeInTheDocument();
      expect(screen.getByText('Test Owner')).toBeInTheDocument();
    });
  });

  it('renders the DateRange calendar component', async () => {
    const bookingsMock = [
      {
        id: '1',
        dateFrom: '2023-07-01',
        dateTo: '2023-07-05',
        guests: 2,
        created: '2023-05-22',
        updated: '2023-05-22',
      },
    ];
    const idMock = '1';
    const isLoggedInMock = true;
    const priceMock = '200';

    render(
      <MemoryRouter>
        <CreateBooking
          bookings={bookingsMock}
          id={idMock}
          isLoggedIn={isLoggedInMock}
          price={priceMock}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('venue-calendar')).toBeInTheDocument();
    });
  });
});
