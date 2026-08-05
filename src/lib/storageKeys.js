export const STORAGE_KEYS = {
  users: 'kanban:users',
  session: 'kanban:session',
  theme: 'kanban:theme',
  board: (userId) => `kanban:board:${userId}`,
};
