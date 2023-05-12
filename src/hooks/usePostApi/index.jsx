import { useState } from 'react';

const usePostApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem('token');

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

  return { post, isLoading, isError, errorMessage };
};

export default usePostApi;
