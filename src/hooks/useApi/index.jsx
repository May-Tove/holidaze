import { useState } from 'react';
import axios from 'axios';
import { useLogin } from '../../context/LoginProvider';

/**
 * A custom hook for making API requests with Axios.
 *
 * @returns {Object} An object containing state variables and functions for making API requests.
 * @property {Function} fetchApi - A function that makes an API request and updates the state variables accordingly.
 * @property {Array} data - An array of data returned from the API.
 * @property {boolean} isLoading - A boolean indicating whether the API request is currently loading.
 * @property {boolean} isError - A boolean indicating whether an error occurred during the API request.
 * @property {string} errorMessage - A string containing the error message if an error occurred during the API request.
 * @property {boolean} success - A boolean indicating whether the API request was successful.
 * @property {Array} searchResults - An array of search results returned from the API.
 * @property {Function} setSearchResults - A function that updates the search results state variable.
 */
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

  /**
   * A function that makes an API request and updates the state variables accordingly.
   *
   * @param {string} url - The URL to make the API request to.
   * @param {string} method - The HTTP method to use for the API request.
   * @param {Object} data - The data to send with the API request.
   * @returns {Promise} A promise that resolves with the API response data, or null if an error occurred.
   */
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
      setData([]);

      if (!error.response) {
        setErrorMessage(`Client-side error: ${error.message}`);
      } else {
        const serverErrorMessage =
          error.response.data.errors &&
          Array.isArray(error.response.data.errors) &&
          error.response.data.errors.length > 0
            ? error.response.data.errors[0].message
            : 'Unknown server error';

        setErrorMessage(`${serverErrorMessage}`);
      }
      return null;
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
