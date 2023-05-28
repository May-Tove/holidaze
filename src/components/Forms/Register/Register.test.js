import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from './index.jsx';
import useApi from '../../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../hooks/useApi');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Register', () => {
  beforeEach(() => {
    // reset all mocks before each test
    jest.resetAllMocks();
  });

  test('user can register as a customer', async () => {
    const mockResponse = {
      data: {
        name: 'Test User',
        email: 'testuser@noroff.no',
        password: 'password123',
        avatar: 'https://example.com/avatar.jpg',
        venueManager: false,
      },
    };

    useApi.mockReturnValue({
      fetchApi: jest.fn().mockResolvedValue(mockResponse),
      isLoading: false,
      isError: false,
      errorMessage: null,
      success: true,
    });

    const navigate = jest.fn();

    useNavigate.mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'testuser@noroff.no' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/avatar/i), {
      target: { value: 'https://example.com/avatar.jpg' },
    });

    fireEvent.click(screen.getByText(/register/i));

    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });

    // Check that navigate is called after a delay
    setTimeout(() => {
      expect(navigate).toHaveBeenCalledWith('/login');
    }, 2000);
  });

  test('user can register as a venue manager', async () => {
    const mockFetchApi = jest.fn().mockResolvedValue({
      data: {
        name: 'Test User',
        email: 'testuser@noroff.no',
        password: 'password123',
        avatar: 'https://example.com/avatar.jpg',
        venueManager: true,
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
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'testuser@noroff.no' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/avatar/i), {
      target: { value: 'https://example.com/avatar.jpg' },
    });
    fireEvent.change(screen.getByLabelText(/venue manager/i), {
      target: { value: true },
    });

    // Mock the API request and response
    const mockResponse = {
      data: {
        name: 'Test User',
        email: 'testuser@noroff.no',
        password: 'password123',
        avatar: 'https://example.com/avatar.jpg',
        venueManager: true,
      },
    };
    window.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    fireEvent.click(screen.getByText(/register/i));

    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });

    // Check that navigate is called after a delay
    setTimeout(() => {
      expect(navigate).toHaveBeenCalledWith('/login');
    }, 2000);
  });

  test('displays error message when a user tries to register with credentials that already exists', async () => {
    const mockFetchApi = jest.fn().mockRejectedValue({
      response: {
        data: {
          message: 'Profile already exists',
        },
      },
    });

    useApi.mockReturnValue({
      fetchApi: mockFetchApi,
      isLoading: false,
      isError: true,
      errorMessage: 'Profile already exists',
      success: false,
    });

    const navigate = jest.fn();

    useNavigate.mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'testuser@noroff.no' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/avatar/i), {
      target: { value: 'https://example.com/avatar.jpg' },
    });

    fireEvent.click(screen.getByText(/register/i));

    // Check for API error message
    await waitFor(() => {
      expect(screen.getByText(/Profile already exists/)).toBeInTheDocument();
    });
  });
});
