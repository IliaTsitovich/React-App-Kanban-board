import { createTask } from './tasks';

function isoDateInDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function createSampleTasks() {
  const samples = [
    {
      title: 'Drag this card to Ready',
      description: 'Grab it anywhere and drop it on another column.',
      status: 'backlog',
      order: 0,
      priority: 'high',
    },
    {
      title: 'Click this title to edit the card',
      description: 'Change the title, priority or due date, then save.',
      status: 'backlog',
      order: 1,
    },
    {
      title: 'Set a due date on a card',
      description: 'Due dates show on the card, like this one.',
      status: 'ready',
      order: 0,
      priority: 'low',
      dueDate: isoDateInDays(3),
    },
    {
      title: 'Move a card with the keyboard',
      description:
        'Tab to a card, press Space to lift it, use the arrow keys, then press Space to drop it.',
      status: 'in-progress',
      order: 0,
    },
    {
      title: 'Search for a card',
      description: 'The search box filters by title. Dragging pauses until you clear it.',
      status: 'in-progress',
      order: 1,
      priority: 'low',
    },
    {
      title: 'Create a profile',
      description: "Done. Clear these examples when you're ready to add your own tasks.",
      status: 'finished',
      order: 0,
    },
  ];
  return samples.map((sample) => ({ ...createTask(sample), sample: true }));
}
