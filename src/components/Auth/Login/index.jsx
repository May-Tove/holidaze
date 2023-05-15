import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useMethodApi from '../../../hooks/useMethodApi';
import { useLogin } from '../../../context/LoginProvider';
import FormSubmitError from '../../Error/FormError';
import { API_AUTH_URL, EMAIL_REGEX } from '../../../shared';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { setIsLoggedIn, setProfile, setToken, setAvatar } = useLogin();
  const { fetchWithMethod, isLoading, isError, errorMessage } = useMethodApi();

  const onSubmit = async (formData) => {
    const response = await fetchWithMethod(
      `${API_AUTH_URL}/login`,
      'post',
      formData
    );

    setIsLoggedIn(true);
    setProfile(response.data);
    setToken(response.data.accessToken);
    setAvatar(response.data.avatar);
    navigate('/venues');
    reset();
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
            pattern: EMAIL_REGEX,
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

/*
const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        'https://api.noroff.dev/api/v1/holidaze/auth/login',
        formData
      );
      const data = response.data;
      setIsLoggedIn(true);
      setProfile(data);
      setToken(data.accessToken);
      setAvatar(data.avatar);
      navigate('/venues');
    } catch (error) {
      console.log(error.response.data.errors[0].message);
    }
  };
*/
