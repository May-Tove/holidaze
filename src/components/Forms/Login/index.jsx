import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../../context/LoginProvider';
import useApi from '../../../hooks/useApi';
import { API_AUTH_URL, EMAIL_REGEX } from '../../../shared';
import ErrorMessage from '../../../shared/errorMessage';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { setIsLoggedIn, setProfile, setToken, setAvatar } = useLogin();
  const { fetchApi, isLoading, isError, errorMessage } = useApi();

  const onSubmit = async (formData) => {
    const response = await fetchApi(`${API_AUTH_URL}/login`, 'post', formData);

    setIsLoggedIn(true);
    setProfile(response.data);
    setToken(response.data.accessToken);
    setAvatar(response.data.avatar);
    navigate('/venues');
    reset();
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="login-form"
    >
      <div>
        <div className="relative">
          <input
            className="floating-input peer"
            type="email"
            id="email"
            placeholder=" "
            {...register('email', {
              required: true,
              pattern: EMAIL_REGEX,
            })}
          />
          <label className="floating-label" htmlFor="email">
            Email
          </label>
        </div>
        {errors.email && (
          <span className="text-red-600 text-sm" id="inputError">
            This field is required and must be a valid noroff.no or
            stud.noroff.no email address.
          </span>
        )}
      </div>
      <div>
        <div className="relative">
          <input
            className="floating-input peer"
            type="password"
            id="password"
            placeholder=" "
            {...register('password', { required: true, minLength: 8 })}
          />
          <label className="floating-label" htmlFor="password">
            Password
          </label>
        </div>
        {errors.password && (
          <span className="text-red-600 text-sm" id="inputError">
            This field is required and must be at least 8 characters long.
          </span>
        )}
      </div>

      <div>
        Do not have an account?{' '}
        <Link to={'/register'} className="text-blue-800 underline">
          Register
        </Link>
      </div>
      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {isError && <ErrorMessage message={errorMessage} />}
    </form>
  );
};

export default LoginForm;
