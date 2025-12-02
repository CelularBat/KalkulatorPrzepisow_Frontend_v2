import React from 'react';

// Global storage for component state across unmounts
const persistentStateMap = new Map();

/**
 * Hook to persist state across component unmounts.
 *
 * @param {string} key - Unique key for this state across mounts
 * @param {any} initialValue - Initial value if none exists
 * @returns {[any, function]} - [state, setState] pair
 */
export function usePersistentState(key, initialValue) {
  const [state, setState] = React.useState(() => {
    return persistentStateMap.has(key) ? persistentStateMap.get(key) : initialValue;
  });

  // On unmount, save the latest state to persistent map
  React.useEffect(() => {
    return () => {
      persistentStateMap.set(key, state);
    };
  }, [state, key]); // include state & key to capture latest state

  return [state, setState];
}
