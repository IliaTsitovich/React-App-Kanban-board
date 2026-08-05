import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { useAuth } from './AuthContext';
import { STORAGE_KEYS } from '../lib/storageKeys';
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
          ? { ...task, ...action.payload.patch, updatedAt: new Date().toISOString() }
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

function readBoard(userId) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.board(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function BoardProvider({ children }) {
  const { user } = useAuth();
  // Lazily compute the initial board for whichever user is already logged in
  // at mount time, so there's never an empty-then-filled gap that the persist
  // effect below could race with and overwrite.
  const [tasks, dispatch] = useReducer(reducer, user, (u) => (u ? readBoard(u.id) : []));
  const loadedUserId = useRef(user?.id ?? null);

  // Whenever the logged-in user actually changes (login/logout/switch account),
  // fully replace in-memory tasks with that user's stored board so boards never
  // bleed between accounts. Skipped on mount (already handled by the lazy
  // initializer above) and safe to double-invoke under StrictMode.
  useEffect(() => {
    const currentId = user?.id ?? null;
    if (currentId === loadedUserId.current) return;
    loadedUserId.current = currentId;
    dispatch({ type: 'LOAD', payload: user ? readBoard(user.id) : [] });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    try {
      window.localStorage.setItem(STORAGE_KEYS.board(user.id), JSON.stringify(tasks));
    } catch {
      // storage full or unavailable - fail silently, in-memory state still works
    }
  }, [tasks, user]);

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

  const columns = useMemo(() => tasksByColumn(tasks), [tasks]);

  const value = useMemo(
    () => ({ tasks, columns, addTask, updateTask, deleteTask, moveTask }),
    [tasks, columns, addTask, updateTask, deleteTask, moveTask]
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook belongs next to its provider
export function useBoard() {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error('useBoard must be used within a BoardProvider');
  return ctx;
}
