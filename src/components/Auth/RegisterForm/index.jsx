import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useMethodApi from '../../../hooks/useMethodApi';
import FormSubmitError from '../../Error/FormError';
import {
  API_AUTH_URL,
  AVATAR_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
} from '../../../shared';

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { fetchWithMethod, isLoading, isError, errorMessage } = useMethodApi();

  const onSubmit = async (formData) => {
    await fetchWithMethod(`${API_AUTH_URL}/register`, 'post', formData);

    navigate('/login');
    reset();
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full">
        <label htmlFor="name">Name</label>
        <input
          className="bg-transparent border-2 border-primary p-1"
          type="text"
          id="name"
          {...register('name', { required: true, pattern: NAME_REGEX })}
        />
        {errors.name && (
          <span className="text-red-900 text-sm">
            This field is required and can only contain letters, numbers, and
            underscores.
          </span>
        )}
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="email">Email</label>
        <input
          className="bg-transparent border-2 border-primary p-1"
          type="email"
          id="email"
          {...register('email', {
            required: true,
            pattern: EMAIL_REGEX,
          })}
        />
        {errors.email && (
          <span className="text-red-900 text-sm">
            This field is required and must be a valid noroff.no or
            stud.noroff.no email address.
          </span>
        )}
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="password">Password</label>
        <input
          className="bg-transparent border-2 border-primary p-1"
          type="password"
          id="password"
          {...register('password', { required: true, minLength: 8 })}
        />
        {errors.password && (
          <span className="text-red-900 text-sm">
            This field is required and must be at least 8 characters long.
          </span>
        )}
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="avatar">Avatar</label>
        <input
          className="bg-transparent border-2 border-primary p-1"
          type="url"
          id="avatar"
          {...register('avatar', {
            required: true,
            pattern: AVATAR_REGEX,
          })}
        />
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
      {isError && <FormSubmitError message={errorMessage} />}
    </form>
  );
};

export default RegisterForm;
