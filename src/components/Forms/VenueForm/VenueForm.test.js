import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VenueForm } from './index.jsx';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../context/LoginProvider', () => ({
  useLogin: () => ({ token: 'venueManagerToken' }),
}));

jest.mock('../../../hooks/useApi', () => {
  return jest.fn().mockReturnValue({
    fetchApi: jest.fn(),
    isLoading: false,
    isError: false,
    errorMessage: null,
    success: true,
  });
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('VenueForm', () => {
  beforeEach(() => {
    // reset all mocks before each test
    jest.resetAllMocks();
  });

  const mockHandleClose = jest.fn();

  test('allows a venue manager to create a new venue', async () => {
    const mockFetchApi = jest.fn().mockResolvedValue({
      data: {
        id: 'newVenueId',
      },
    });

    useApi.mockReturnValue({
      fetchApi: mockFetchApi,
      isLoading: false,
      isError: false,
      errorMessage: null,
      success: true,
    });

    const navigate = jest.fn();

    useNavigate.mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <VenueForm
          mode="create"
          handleClose={mockHandleClose}
          venue={{}}
          token="venueManagerToken"
        />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'New Venue' },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'New Venue Description' },
    });
    fireEvent.change(screen.getByLabelText(/Address/i), {
      target: { value: 'Address' },
    });
    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: 'City' },
    });
    fireEvent.change(screen.getByLabelText(/Zip/i), {
      target: { value: 'Zip' },
    });
    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: 'Country' },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByLabelText(/Max Guests/i), {
      target: { value: '50' },
    });
    fireEvent.change(screen.getByLabelText(/Breakfast/i), {
      target: { value: true },
    });
    fireEvent.change(screen.getByLabelText(/Wifi/i), {
      target: { value: true },
    });
    fireEvent.change(screen.getByLabelText(/Pets allowed/i), {
      target: { value: true },
    });
    fireEvent.change(screen.getByLabelText(/Parking/i), {
      target: { value: true },
    });
    fireEvent.change(screen.getByTestId('image-input-0'), {
      target: { value: 'image1.jpg' },
    });

    // Mock the API request and response
    const mockResponse = {
      data: {
        id: 'newVenueId',
      },
    };
    window.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /create venue/i }));

    // Wait for the form submission to complete and then check is success message is showing
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });

    // Check that navigate is called after a delay
    setTimeout(() => {
      expect(navigate).toHaveBeenCalledWith('/venue/newVenueId');
    }, 2000);
  });
});
