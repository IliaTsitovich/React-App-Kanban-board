import { toast } from 'sonner';

let unreadableDataFound = false;

function parse(raw, schema) {
  try {
    const result = schema.safeParse(JSON.parse(raw));
    return result.success ? result : null;
  } catch {
    return null;
  }
}

// Unreadable values are copied aside rather than discarded, so a bad read can
// never be the reason a user's data disappears.
export function readStored(key, schema, fallback) {
  let raw;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return fallback;
  }
  if (raw === null) return fallback;

  const parsed = parse(raw, schema);
  if (parsed) return parsed.data;

  console.error(`Unreadable data in localStorage key "${key}"`);
  unreadableDataFound = true;
  try {
    window.localStorage.setItem(`${key}:corrupt`, raw);
  } catch {
    // no room for the copy - the original stays in place until the next save
  }
  return fallback;
}

export function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    toast.error("Changes aren't saved: browser storage is full or unavailable.", {
      id: 'storage-write-failed',
      duration: 10000,
    });
    return false;
  }
}

export function removeStored(key) {
  try {
    window.localStorage.removeItem(key);
    window.localStorage.removeItem(`${key}:corrupt`);
  } catch {
    // storage unavailable - nothing to remove
  }
}

export function takeUnreadableDataFlag() {
  const found = unreadableDataFound;
  unreadableDataFound = false;
  return found;
}
