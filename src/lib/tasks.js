export const COLUMNS = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'ready', title: 'Ready' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'finished', title: 'Finished' },
];

export const PRIORITIES = ['low', 'medium', 'high'];

export function createTaskId() {
  return crypto.randomUUID();
}

export function createTask({ title, description = '', status = 'backlog', order = 0, priority = 'medium', dueDate = null }) {
  const now = new Date().toISOString();
  return {
    id: createTaskId(),
    title,
    description,
    status,
    order,
    priority,
    dueDate,
    createdAt: now,
    updatedAt: now,
  };
}

export function tasksByColumn(tasks) {
  const grouped = Object.fromEntries(COLUMNS.map((c) => [c.id, []]));
  for (const task of tasks) {
    (grouped[task.status] ?? grouped.backlog).push(task);
  }
  for (const columnId of Object.keys(grouped)) {
    grouped[columnId].sort((a, b) => a.order - b.order);
  }
  return grouped;
}

export function nextOrderInColumn(tasks, status) {
  const inColumn = tasks.filter((t) => t.status === status);
  return inColumn.length ? Math.max(...inColumn.map((t) => t.order)) + 1 : 0;
}

export function renumberColumn(tasks, status, orderedIds) {
  const orderIndex = new Map(orderedIds.map((id, index) => [id, index]));
  return tasks.map((task) =>
    task.status === status && orderIndex.has(task.id)
      ? { ...task, order: orderIndex.get(task.id) }
      : task
  );
}
