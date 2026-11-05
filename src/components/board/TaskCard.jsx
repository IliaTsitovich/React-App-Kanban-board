import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { isoDateInDays } from '../../lib/tasks';
import './TaskCard.scss';

const PRIORITY_LABEL = { low: 'Low', medium: 'Medium', high: 'High' };

export function TaskCard({ task, onOpen, disabled, overlay }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: 'task', status: task.status },
    disabled,
  });

  const { onTouchStart, ...cardListeners } = listeners ?? {};
  const isFinished = task.status === 'finished';
  const isOverdue = Boolean(task.dueDate) && !isFinished && task.dueDate < isoDateInDays(0);

  const style = overlay
    ? undefined
    : {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      };

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={style}
      className={`item-task${overlay ? ' item-task-overlay' : ''}`}
      {...(overlay ? {} : attributes)}
      {...(overlay ? {} : cardListeners)}
    >
      <button type="button" className="item-task-title" onClick={onOpen}>
        {task.title}
      </button>
      <div className="item-task-meta">
        <span className={`priority-badge priority-${task.priority}`}>
          {PRIORITY_LABEL[task.priority]}
        </span>
        {task.dueDate && (
          <span className={isOverdue ? 'due-date due-date_overdue' : 'due-date'}>
            {isOverdue && 'Overdue '}
            {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString()}
          </span>
        )}
        {isFinished && <span className="item-task-done">Done</span>}
      </div>
      <span className="item-task-handle" aria-hidden="true" onTouchStart={onTouchStart}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M5 3h2v2H5zM9 3h2v2H9zM5 7h2v2H5zM9 7h2v2H9zM5 11h2v2H5zM9 11h2v2H9z" />
        </svg>
      </span>
    </div>
  );
}
