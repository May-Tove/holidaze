import { useState } from 'react';

/**
 * Hook from https://usehooks.com/useLocalStorage/
 *
 * @param {string} key - The key to use for storing the data in local storage.
 * @param {*} initialValue - The initial value to use if no value is found in local storage.
 * @returns {Array} An array containing the stored value and a function to update the stored value.
 */
const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      alert(`Error storing '${key}' to localStorage: ${error.message}`);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
