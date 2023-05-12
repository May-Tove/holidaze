import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../../context/LoginProvider';
import usePostApi from '../../../hooks/usePostApi';
import FormSubmitError from '../../Error/FormError';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { setIsLoggedIn, setProfile, setToken } = useLogin();
  const { post, isLoading, isError, errorMessage } = usePostApi();

  const onSubmit = async (formData) => {
    const response = await post(
      'https://api.noroff.dev/api/v1/holidaze/auth/login',
      formData
    );
    const data = await response.json();

    if (response.ok) {
      setIsLoggedIn(true);
      setProfile(data);
      setToken(data.accessToken); // Store the token in local storage
      navigate('/venues');
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
          <span className="text-red-600 text-sm mt-1">
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
          <span className="text-red-600 text-sm mt-1">
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
      {isError && <FormSubmitError message={errorMessage} />}
    </form>
  );
};

export default LoginForm;
