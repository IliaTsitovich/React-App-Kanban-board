import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../lib/storageKeys';
import { hashPassword, verifyPassword } from '../lib/crypto';

const AuthContext = createContext(null);

function sameUsername(a, b) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage(STORAGE_KEYS.users, []);
  const [session, setSession] = useLocalStorage(STORAGE_KEYS.session, null);

  const user = useMemo(
    () => users.find((u) => u.id === session?.userId) ?? null,
    [users, session]
  );

  const register = useCallback(
    async ({ username, email, password }) => {
      if (users.some((u) => sameUsername(u.username, username))) {
        return { ok: false, error: 'That username is already taken.' };
      }
      if (users.some((u) => u.email.trim().toLowerCase() === email.trim().toLowerCase())) {
        return { ok: false, error: 'That email is already registered.' };
      }
      const { salt, hash } = await hashPassword(password);
      const newUser = {
        id: crypto.randomUUID(),
        username: username.trim(),
        email: email.trim(),
        passwordSalt: salt,
        passwordHash: hash,
        // The very first account ever created becomes the admin, so a fresh
        // install always has someone able to reach the admin panel.
        role: users.length === 0 ? 'admin' : 'user',
        createdAt: new Date().toISOString(),
      };
      setUsers((prev) => [...prev, newUser]);
      setSession({ userId: newUser.id });
      return { ok: true, user: newUser };
    },
    [users, setUsers, setSession]
  );

  const login = useCallback(
    async ({ username, password }) => {
      const found = users.find((u) => sameUsername(u.username, username));
      if (!found) {
        return { ok: false, error: 'Invalid username or password.' };
      }
      const valid = await verifyPassword(password, found.passwordSalt, found.passwordHash);
      if (!valid) {
        return { ok: false, error: 'Invalid username or password.' };
      }
      setSession({ userId: found.id });
      return { ok: true, user: found };
    },
    [users, setSession]
  );

  const logout = useCallback(() => setSession(null), [setSession]);

  const adminCount = useMemo(() => users.filter((u) => u.role === 'admin').length, [users]);

  const setRole = useCallback(
    (userId, role) => {
      const target = users.find((u) => u.id === userId);
      if (target?.role === 'admin' && role !== 'admin' && adminCount <= 1) {
        return { ok: false, error: 'At least one admin must remain.' };
      }
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
      return { ok: true };
    },
    [users, adminCount, setUsers]
  );

  const deleteUser = useCallback(
    (userId) => {
      const target = users.find((u) => u.id === userId);
      if (target?.role === 'admin' && adminCount <= 1) {
        return { ok: false, error: 'At least one admin must remain.' };
      }
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      window.localStorage.removeItem(STORAGE_KEYS.board(userId));
      if (session?.userId === userId) setSession(null);
      return { ok: true };
    },
    [users, adminCount, setUsers, session, setSession]
  );

  const value = useMemo(
    () => ({ user, users, register, login, logout, setRole, deleteUser }),
    [user, users, register, login, logout, setRole, deleteUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook belongs next to its provider
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
