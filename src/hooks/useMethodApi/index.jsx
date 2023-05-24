import { useState } from 'react';
import axios from 'axios';
import { useLogin } from '../../context/LoginProvider';

const useMethodApi = () => {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useLogin();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const fetchWithMethod = async (url, method, data) => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: url,
        method: method,
        headers: headers,
        data: data,
      });
      setData(response.data);
      setSuccess(true);

      return response;
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response.data.errors[0].message);

      setSuccess(false);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchWithMethod,
    data,
    isLoading,
    isError,
    errorMessage,
    success,
  };
};

export default useMethodApi;
/*
const usePostApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showSuccess, setShowSuccess] = useState(false);

  const { token } = useLogin();

  const post = async (url, data) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage('');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        let errorFeedback = '';
        const message = error.errors[0].message;

        if (!message) {
          errorFeedback = error.status;
        } else {
          errorFeedback = message;
        }

        throw new Error(errorFeedback);
      }

      return response;
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    post,
    isLoading,
    isError,
    errorMessage,
    setShowSuccess,
    showSuccess,
  };
};

export default usePostApi;*/
