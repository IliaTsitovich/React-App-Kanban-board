export const STORAGE_KEYS = {
  // Key name predates profiles; kept so existing boards stay attached to their owners.
  profiles: 'kanban:users',
  session: 'kanban:session',
  theme: 'kanban:theme',
  board: (profileId) => `kanban:board:${profileId}`,
};
