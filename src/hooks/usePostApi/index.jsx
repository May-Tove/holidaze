import { useState } from 'react';

const usePostApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const post = async (url, data) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsSuccess(true);
    }
  };

  return { post, isLoading, isError, isSuccess };
};

export default usePostApi;
