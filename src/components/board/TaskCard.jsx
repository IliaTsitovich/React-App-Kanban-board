import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './TaskCard.scss';

const PRIORITY_LABEL = { low: 'Low', medium: 'Medium', high: 'High' };

export function TaskCard({ task, onOpen, disabled, overlay }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: 'task', status: task.status },
    disabled,
  });

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
      className={`item-task priority-${task.priority}${overlay ? ' item-task-overlay' : ''}`}
      {...(overlay ? {} : attributes)}
      {...(overlay ? {} : listeners)}
    >
      <button type="button" className="item-task-title" onClick={onOpen}>
        {task.title}
      </button>
      <div className="item-task-meta">
        <span className={`priority-badge priority-${task.priority}`}>{PRIORITY_LABEL[task.priority]}</span>
        {task.dueDate && (
          <span className="due-date">{new Date(task.dueDate).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
}
