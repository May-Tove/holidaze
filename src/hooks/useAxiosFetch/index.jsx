import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLogin } from '../../context/LoginProvider';

const useAxiosFetch = (dataUrl, method) => {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const { token } = useLogin();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const handleFetchError = (error) => {
    setIsError(true);
    setFetchError(error.message);
    setData([]);
    setSuccess(null);
  };

  const handleSuccessFetch = (response) => {
    setData(response.data);
    setSearchResults(response.data);
    setSuccess(true);
    setIsError(false);
    setFetchError(null);
  };

  const submit = async (url, method, formData) => {
    setIsLoading(true);

    try {
      const response = await axios({
        url: url,
        method: method,
        headers: headers,
        data: formData,
      });

      handleSuccessFetch(response);

      return response;
    } catch (error) {
      handleFetchError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);

      try {
        const response = await axios({
          url: url,
          method: method,
          headers: headers,
          cancelToken: source.token,
        });

        if (isMounted) {
          handleSuccessFetch(response);
        }
      } catch (error) {
        if (isMounted) {
          handleFetchError(error);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData(dataUrl);

    const cleanup = () => {
      isMounted = false;
      source.cancel();
    };
    return cleanup;
  }, [dataUrl, method]);

  return {
    data,
    searchResults,
    setSearchResults,
    success,
    fetchError,
    isError,
    isLoading,
    submit,
  };
};

export default useAxiosFetch;

/**
 * Our API hook
 */
/*
function useApi(url, options) {
 const [data, setData] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [isError, setIsError] = useState(false);


 useEffect(() => {
   const fetchData = async () => {
     try {
       setIsLoading(true);
       setIsError(false);
       const response = await fetch(url, options);
       const result = await response.json();
       setData(result);
     } catch (error) {
       console.error(error);
       setIsError(true);
     } finally {
       setIsLoading(false);
     }
   };


   fetchData();
 }, [url]);


 return { data, isLoading, isError };
}


export default useApi;*/
