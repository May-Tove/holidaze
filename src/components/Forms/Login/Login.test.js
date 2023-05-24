import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LoginForm from './index.jsx';
import useMethodApi from '../../../hooks/useMethodApi';
import { MemoryRouter, useNavigate } from 'react-router-dom';

jest.mock('../../../context/LoginProvider', () => ({
  useLogin: () => ({
    setIsLoggedIn: jest.fn(),
    setProfile: jest.fn(),
    setToken: jest.fn(),
    setAvatar: jest.fn(),
  }),
}));

jest.mock('../../../hooks/useMethodApi', () => {
  return jest.fn().mockReturnValue({
    fetchWithMethod: jest.fn(),
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

describe('LoginForm', () => {
  beforeEach(() => {
    // reset all mocks before each test
    jest.resetAllMocks();
  });

  test('Can log in successfully with valid credentials', async () => {
    const mockFetchWithMethod = jest.fn().mockResolvedValue({
      data: {
        name: 'mth',
        email: 'mth@noroff.no',
        accessToken: 'fakeToken',
        avatar: 'fakeAvatar',
      },
    });

    useMethodApi.mockReturnValue({
      fetchWithMethod: mockFetchWithMethod,
      isLoading: false,
      isError: false,
      errorMessage: null,
    });

    const navigate = jest.fn();

    useNavigate.mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'mth@noroff.no' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/venues'));
  });
});
