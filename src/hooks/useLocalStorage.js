import { useCallback, useEffect, useState } from 'react';

function readValue(key, initialValue) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or unavailable (private browsing) - fail silently, in-memory state still works
    }
  }, [key, value]);

  // Keep multiple tabs of the app in sync with each other.
  useEffect(() => {
    function handleStorage(event) {
      if (event.key === key) {
        setValue(readValue(key, initialValue));
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, initialValue]);

  const reload = useCallback(() => {
    setValue(readValue(key, initialValue));
  }, [key, initialValue]);

  return [value, setValue, reload];
}
