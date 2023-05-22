import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import ErrorMessage from '../../../shared/errorMessage';
import {
  API_AUTH_URL,
  AVATAR_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
} from '../../../shared';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { submit, isLoading, isError, fetchError } = useAxiosFetch();

  const onSubmit = async (formData) => {
    await submit(`${API_AUTH_URL}/register`, 'post', formData);

    navigate('/login');
    reset();
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="relative">
          <input
            className="floating-input peer"
            type="text"
            id="name"
            placeholder=" "
            {...register('name', { required: true, pattern: NAME_REGEX })}
          />
          <label className="floating-label" htmlFor="name">
            Name
          </label>
        </div>
        {errors.name && (
          <span className="text-red-900 text-sm">
            This field is required and can only contain letters, numbers, and
            underscores.
          </span>
        )}
      </div>
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
          <span className="text-red-900 text-sm">
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
          <span className="text-red-900 text-sm">
            This field is required and must be at least 8 characters long.
          </span>
        )}
      </div>
      <div>
        <div className="relative">
          <input
            className="floating-input peer"
            type="url"
            id="avatar"
            placeholder=" "
            {...register('avatar', {
              required: true,
              pattern: AVATAR_REGEX,
            })}
          />
          <label className="floating-label" htmlFor="avatar">
            Avatar
          </label>
        </div>
        {errors.avatar && (
          <span className="text-red-900 text-sm">
            This field is required and must be a valid URL.
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="venueManager">Venue Manager</label>
        <input
          type="checkbox"
          id="venueManager"
          {...register('venueManager')}
        />
      </div>
      <div>
        Already have an account?{' '}
        <Link to={'/login'} className="text-blue-600 underline">
          Login
        </Link>
      </div>
      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      {isError && <ErrorMessage message={fetchError} />}
    </form>
  );
};

export default RegisterForm;
