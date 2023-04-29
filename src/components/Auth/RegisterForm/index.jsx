import React from 'react';
import { useForm } from 'react-hook-form';
import usePostApi from '../../../hooks/usePostApi';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { post, isLoading, isError, isSuccess } = usePostApi();

  const onSubmit = async (data, e) => {
    console.log(data);
    await post('https://api.noroff.dev/api/v1/holidaze/auth/register', data);

    if (isSuccess) {
      e.target.reset();
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full">
        <label htmlFor="name">Name:</label>
        <input
          className="bg-transparent border-2 border-primary p-1"
          type="text"
          id="name"
          {...register('name', { required: true, pattern: /^[A-Za-z0-9_]+$/ })}
        />
        {errors.name && (
          <span className="text-red-900 text-sm">
            This field is required and can only contain letters, numbers, and
            underscores.
          </span>
        )}
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="email">Email:</label>
        <input
          className="bg-transparent border-2 border-primary p-1"
          type="email"
          id="email"
          {...register('email', {
            required: true,
            pattern: /^[\w-\.]+@(?:noroff|stud\.noroff)\.no$/, // eslint-disable-line
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
        <label htmlFor="password">Password:</label>
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
        <label htmlFor="avatar">Avatar:</label>
        <input
          className="bg-transparent border-2 border-primary p-1"
          type="url"
          id="avatar"
          {...register('avatar', {
            required: true,
            pattern: /^(ftp|http|https):\/\/[^ "]+$/,
          })}
        />
        {errors.avatar && (
          <span className="text-red-900 text-sm">
            This field is required and must be a valid URL.
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="venueManager">Venue Manager:</label>
        <input
          type="checkbox"
          id="venueManager"
          {...register('venueManager')}
        />
      </div>
      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Register'}
      </button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Registration failed.</p>}
      {isSuccess && <p>Yay success</p>}
    </form>
  );
};

export default RegisterForm;
