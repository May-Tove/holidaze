import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import ErrorMessage from '../../../shared/errorMessage';
import SuccessMessage from '../../../shared/successMessage';
import {
  API_AUTH_URL,
  AVATAR_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
} from '../../../shared';

const RegisterForm = () => {
  const schema = yup
    .object({
      name: yup
        .string()
        .required()
        .matches(
          NAME_REGEX,
          'Name can only contain letters, numbers and underscores.'
        ),
      email: yup
        .string()
        .required()
        .matches(
          EMAIL_REGEX,
          'Email address must be a valid noroff.no or stud.noroff.no email address.'
        ),
      password: yup.string().required().min(8),
      avatar: yup
        .string()
        .required()
        .matches(AVATAR_REGEX, 'Avatar must be a valid URL.'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const { fetchApi, isLoading, isError, errorMessage, success } = useApi();

  const onSubmit = async (formData) => {
    await fetchApi(`${API_AUTH_URL}/register`, 'post', formData);

    reset();
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <form
      className="flex flex-col gap-5 pt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="relative">
          <input
            className="floating-input peer"
            type="text"
            id="name"
            placeholder=" "
            {...register('name')}
          />
          <label className="floating-label" htmlFor="name">
            Name
          </label>
        </div>
        <p id="inputError">{errors.name?.message}</p>
      </div>
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
      <div>
        <div className="relative">
          <input
            className="floating-input peer"
            type="url"
            id="avatar"
            placeholder=" "
            {...register('avatar')}
          />

          <label className="floating-label" htmlFor="avatar">
            Avatar URL
          </label>
        </div>
        <p id="inputError">{errors.avatar?.message}</p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="venueManager"
          {...register('venueManager')}
        />
        <label htmlFor="venueManager">Venue Manager</label>
      </div>

      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      {isError && <ErrorMessage message={errorMessage} />}
      {success && (
        <SuccessMessage message="Registration successful, you can now log in to your account" />
      )}
    </form>
  );
};

export default RegisterForm;
