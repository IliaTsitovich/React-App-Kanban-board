import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { useProfile } from './ProfileContext';
import { STORAGE_KEYS } from '../lib/storageKeys';
import { readStored, writeStored } from '../lib/storage';
import { boardSchema } from '../lib/validation';
import { createTask, nextOrderInColumn, renumberColumn, tasksByColumn } from '../lib/tasks';

const BoardContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return action.payload;

    case 'ADD_TASK':
      return [...state, action.payload];

    case 'UPDATE_TASK':
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.patch, sample: false, updatedAt: new Date().toISOString() }
          : task
      );

    case 'DELETE_TASK': {
      const removed = state.find((t) => t.id === action.payload.id);
      const remaining = state.filter((t) => t.id !== action.payload.id);
      if (!removed) return state;
      const orderedIds = remaining
        .filter((t) => t.status === removed.status)
        .sort((a, b) => a.order - b.order)
        .map((t) => t.id);
      return renumberColumn(remaining, removed.status, orderedIds);
    }

    case 'CLEAR_SAMPLES':
      return state.filter((task) => !task.sample);

    case 'MOVE_TASK': {
      const { id, toStatus, toIndex } = action.payload;
      const moving = state.find((t) => t.id === id);
      if (!moving) return state;
      const fromStatus = moving.status;

      const destColumn = state
        .filter((t) => t.status === toStatus && t.id !== id)
        .sort((a, b) => a.order - b.order);
      destColumn.splice(toIndex, 0, moving);
      const destIds = destColumn.map((t) => t.id);

      let next = state.map((t) =>
        t.id === id ? { ...t, status: toStatus, updatedAt: new Date().toISOString() } : t
      );
      next = renumberColumn(next, toStatus, destIds);

      if (fromStatus !== toStatus) {
        const sourceIds = next
          .filter((t) => t.status === fromStatus)
          .sort((a, b) => a.order - b.order)
          .map((t) => t.id);
        next = renumberColumn(next, fromStatus, sourceIds);
      }
      return next;
    }

    default:
      return state;
  }
}

function readBoard(profileId) {
  return readStored(STORAGE_KEYS.board(profileId), boardSchema, []);
}

// Keyed by profile, so switching profiles always starts from a clean store and
// one profile's tasks can never be written under another profile's key.
export function BoardProvider({ children }) {
  const { profile } = useProfile();
  const profileId = profile?.id ?? null;
  return (
    <BoardStore key={profileId} profileId={profileId}>
      {children}
    </BoardStore>
  );
}

function BoardStore({ profileId, children }) {
  const [tasks, dispatch] = useReducer(reducer, profileId, (id) => (id ? readBoard(id) : []));
  const persisted = useRef(tasks);

  // Only real changes are written, so loading a board never overwrites storage.
  useEffect(() => {
    if (!profileId || tasks === persisted.current) return;
    persisted.current = tasks;
    writeStored(STORAGE_KEYS.board(profileId), tasks);
  }, [tasks, profileId]);

  // Pick up changes from other tabs; otherwise each tab would overwrite the others' tasks.
  useEffect(() => {
    if (!profileId) return;
    function handleStorage(event) {
      if (event.key !== STORAGE_KEYS.board(profileId) && event.key !== null) return;
      const next = readBoard(profileId);
      persisted.current = next;
      dispatch({ type: 'LOAD', payload: next });
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [profileId]);

  const addTask = useCallback((status, { title, description, priority, dueDate }) => {
    dispatch({
      type: 'ADD_TASK',
      payload: createTask({
        title,
        description,
        priority,
        dueDate,
        status,
        order: nextOrderInColumn(tasks, status),
      }),
    });
  }, [tasks]);

  const updateTask = useCallback((id, patch) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, patch } });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: 'DELETE_TASK', payload: { id } });
  }, []);

  const moveTask = useCallback((id, toStatus, toIndex) => {
    dispatch({ type: 'MOVE_TASK', payload: { id, toStatus, toIndex } });
  }, []);

  const clearSamples = useCallback(() => {
    dispatch({ type: 'CLEAR_SAMPLES' });
  }, []);

  const columns = useMemo(() => tasksByColumn(tasks), [tasks]);

  const value = useMemo(
    () => ({ tasks, columns, addTask, updateTask, deleteTask, moveTask, clearSamples }),
    [tasks, columns, addTask, updateTask, deleteTask, moveTask, clearSamples]
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook belongs next to its provider
export function useBoard() {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error('useBoard must be used within a BoardProvider');
  return ctx;
}
