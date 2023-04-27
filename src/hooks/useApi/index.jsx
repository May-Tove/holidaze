import { useEffect, useState } from 'react';

const useApi = (url) => {
  const [venues, setVenues] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getVenues() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url);
        const json = await response.json();
        setVenues(json);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getVenues();
  }, [url]);

  return { venues, isLoading, isError };
};

export default useApi;
