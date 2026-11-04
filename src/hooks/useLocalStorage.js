import { useEffect, useRef, useState } from 'react';
import { readStored, writeStored } from '../lib/storage';

// initialValue and schema must be stable between renders.
export function useLocalStorage(key, initialValue, schema) {
  const [value, setValue] = useState(() => readStored(key, schema, initialValue));
  const persisted = useRef(value);

  // Only real changes are written, so loading the app never overwrites storage.
  useEffect(() => {
    if (value === persisted.current) return;
    persisted.current = value;
    writeStored(key, value);
  }, [key, value]);

  // Keep multiple tabs of the app in sync with each other.
  useEffect(() => {
    function handleStorage(event) {
      if (event.key !== key && event.key !== null) return;
      const next = readStored(key, schema, initialValue);
      persisted.current = next;
      setValue(next);
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, initialValue, schema]);

  return [value, setValue];
}
