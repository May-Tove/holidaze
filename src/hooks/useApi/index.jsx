import { useState } from 'react';
import axios from 'axios';
import { useLogin } from '../../context/LoginProvider';

const useApi = () => {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const { token } = useLogin();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const fetchApi = async (url, method, data) => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: url,
        method: method,
        headers: headers,
        data: data,
      });
      setData(response.data);
      setSearchResults(response.data);
      setSuccess(true);
      setIsError(false);
      setErrorMessage(null);

      return response;
    } catch (error) {
      setIsError(true);
      setSuccess(false);

      // error.response is undefined when the error is client-side
      if (!error.response) {
        setErrorMessage(`Client-side error: ${error.message}`);
      } else {
        // Server-side error
        // error.response.data.errors is not guaranteed to be an array with at least one item
        const serverErrorMessage =
          error.response.data.errors &&
          Array.isArray(error.response.data.errors) &&
          error.response.data.errors.length > 0
            ? error.response.data.errors[0].message
            : 'Unknown server error';

        setErrorMessage(`${serverErrorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchApi,
    data,
    isLoading,
    isError,
    errorMessage,
    success,
    searchResults,
    setSearchResults,
  };
};

export default useApi;
