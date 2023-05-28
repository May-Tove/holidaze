import { useCallback, useState } from 'react';

/**
 * Hook from https://usehooks.com/useToggle/
 * Provides a boolean state and a function to toggle the state.
 *
 * @param {boolean} initialState - The initial state of the boolean value. Defaults to "false".
 * @returns {Array} An array containing the boolean state and a function to toggle the state.
 */
const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

export default useToggle;
