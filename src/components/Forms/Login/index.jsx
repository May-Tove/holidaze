import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLogin } from '../../../context/LoginProvider';
import useApi from '../../../hooks/useApi';
import { API_AUTH_URL, EMAIL_REGEX } from '../../../shared';
import ErrorMessage from '../../ErrorMessage';

/**
 * A component that displays and validates a login form, allowing a user to log in.
 * @returns {JSX.Element} - A JSX element representing the LoginForm component.
 */
const LoginForm = () => {
  const schema = yup
    .object({
      email: yup
        .string()
        .required()
        .matches(
          EMAIL_REGEX,
          'Email address must be a valid noroff.no or stud.noroff.no email address.'
        ),

      password: yup.string().required().min(8),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const { setIsLoggedIn, setProfile, setToken, setAvatar } = useLogin();
  const { fetchApi, isLoading, isError, errorMessage } = useApi();

  const onSubmit = async (formData) => {
    const response = await fetchApi(`${API_AUTH_URL}/login`, 'post', formData);

    if (response && response.data) {
      setIsLoggedIn(true);
      setProfile(response.data);
      setToken(response.data.accessToken);
      setAvatar(response.data.avatar);
      navigate('/venues');
      reset();
    }
  };

  return (
    <form
      className="flex flex-col gap-5 pt-5"
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
            {...register('email')}
          />
          <label className="floating-label" htmlFor="email">
            Email
          </label>
        </div>
        <p id="inputError">{errors.email?.message}</p>
      </div>
      <div>
        <div className="relative">
          <input
            className="floating-input peer"
            type="password"
            id="password"
            placeholder=" "
            {...register('password')}
          />
          <label className="floating-label" htmlFor="password">
            Password
          </label>
        </div>
        <p id="inputError">{errors.password?.message}</p>
      </div>

      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {isError && <ErrorMessage message={errorMessage} />}
    </form>
  );
};

export default LoginForm;
