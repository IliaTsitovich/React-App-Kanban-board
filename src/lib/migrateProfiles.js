import { STORAGE_KEYS } from './storageKeys';

// Earlier versions stored emails, password hashes, salts and roles here.
// Nothing reads them any more, so remove them from the browser for good.
export function stripLegacyAccountData() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.profiles);
    if (raw === null) return;
    const stored = JSON.parse(raw);
    if (!Array.isArray(stored)) return;
    const profiles = stored
      .filter((p) => typeof p?.id === 'string' && typeof p?.username === 'string')
      .map(({ id, username, createdAt }) => ({ id, username, createdAt }));
    const cleaned = JSON.stringify(profiles);
    if (cleaned !== raw) window.localStorage.setItem(STORAGE_KEYS.profiles, cleaned);
  } catch {
    // unreadable or unavailable storage - nothing to migrate
  }
}
