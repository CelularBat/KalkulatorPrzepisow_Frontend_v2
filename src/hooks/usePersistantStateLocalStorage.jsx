import React from 'react';

/**
 * Hook to persist state across component unmounts using localStorage.
 *
 * @param {string} key - Unique key in localStorage
 * @param {any} initialValue - Initial value if none exists in localStorage
 * @returns {[any, function]} - [state, setState] pair
 */
export function usePersistentStateLocalStorage(key, initialValue) {
  // Initialize state from localStorage if present
  const [state, setState] = React.useState(() => {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : initialValue;
  });

  // Whenever state changes, persist it to localStorage
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
