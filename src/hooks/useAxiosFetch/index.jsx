import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLogin } from '../../context/LoginProvider';

const useAxiosFetch = (dataUrl, method) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { token } = useLogin();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
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
          setData(response.data);
          setFetchError(null);
        }
      } catch (error) {
        if (isMounted) {
          setFetchError(error.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };
    return cleanUp;
  }, [dataUrl, method]);

  return { data, fetchError, isLoading };
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
