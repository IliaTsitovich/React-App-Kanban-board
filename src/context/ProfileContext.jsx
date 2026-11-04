import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../lib/storageKeys';
import { removeStored } from '../lib/storage';
import { profilesSchema, sessionSchema } from '../lib/validation';

const ProfileContext = createContext(null);
const NO_PROFILES = [];

export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useLocalStorage(
    STORAGE_KEYS.profiles,
    NO_PROFILES,
    profilesSchema
  );
  const [session, setSession] = useLocalStorage(STORAGE_KEYS.session, null, sessionSchema);

  const profile = useMemo(
    () => profiles.find((p) => p.id === session?.userId) ?? null,
    [profiles, session]
  );

  const createProfile = useCallback(
    ({ username }) => {
      const name = username.trim();
      if (profiles.some((p) => p.username.toLowerCase() === name.toLowerCase())) {
        return { ok: false, error: 'That name is already used in this browser.' };
      }
      const newProfile = {
        id: crypto.randomUUID(),
        username: name,
        createdAt: new Date().toISOString(),
      };
      setProfiles((prev) => [...prev, newProfile]);
      setSession({ userId: newProfile.id });
      return { ok: true, profile: newProfile };
    },
    [profiles, setProfiles, setSession]
  );

  const selectProfile = useCallback((id) => setSession({ userId: id }), [setSession]);

  const exitProfile = useCallback(() => setSession(null), [setSession]);

  const deleteProfile = useCallback(
    (id) => {
      setProfiles((prev) => prev.filter((p) => p.id !== id));
      removeStored(STORAGE_KEYS.board(id));
      if (session?.userId === id) setSession(null);
    },
    [setProfiles, session, setSession]
  );

  const value = useMemo(
    () => ({ profile, profiles, createProfile, selectProfile, exitProfile, deleteProfile }),
    [profile, profiles, createProfile, selectProfile, exitProfile, deleteProfile]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook belongs next to its provider
export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within a ProfileProvider');
  return ctx;
}
