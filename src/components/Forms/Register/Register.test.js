import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from './index.jsx';
import useMethodApi from '../../../hooks/useMethodApi';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../hooks/useMethodApi');

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

    useMethodApi.mockReturnValue({
      fetchWithMethod: jest.fn().mockResolvedValue(mockResponse),
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
    const mockFetchWithMethod = jest.fn().mockResolvedValue({
      data: {
        name: 'Test User',
        email: 'testuser@noroff.no',
        password: 'password123',
        avatar: 'https://example.com/avatar.jpg',
        venueManager: true,
      },
    });

    useMethodApi.mockReturnValue({
      fetchWithMethod: mockFetchWithMethod,
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

  test('displays error messages when form is submitted empty', async () => {
    useMethodApi.mockReturnValue({
      fetchWithMethod: jest.fn(),
      isLoading: false,
      isError: false,
      errorMessage: null,
      success: false,
    });

    const navigate = jest.fn();

    useNavigate.mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/register/i));

    // Check for name field error message
    await waitFor(() => {
      expect(
        screen.getByText(
          /This field is required and can only contain letters, numbers, and underscores./
        )
      ).toBeInTheDocument();
    });

    // Check for email field error message
    await waitFor(() => {
      expect(
        screen.getByText(
          /This field is required and must be a valid noroff.no or stud.noroff.no email address./
        )
      ).toBeInTheDocument();
    });

    // Check for password field error message
    await waitFor(() => {
      expect(
        screen.getByText(
          /This field is required and must be at least 8 characters long./
        )
      ).toBeInTheDocument();
    });

    // Check for avatar field error message
    await waitFor(() => {
      expect(
        screen.getByText(/This field is required and must be a valid URL./)
      ).toBeInTheDocument();
    });
  });

  test('displays error message when a user tries to register with credentials that already exists', async () => {
    const mockFetchWithMethod = jest.fn().mockRejectedValue({
      response: {
        data: {
          message: 'Profile already exists',
        },
      },
    });

    useMethodApi.mockReturnValue({
      fetchWithMethod: mockFetchWithMethod,
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
