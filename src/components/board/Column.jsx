import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { AddTaskForm } from './AddTaskForm';
import './Column.scss';

export function Column({ column, tasks, onOpenTask, dragDisabled }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { type: 'column', status: column.id },
  });

  return (
    <div className="column">
      <div className="column-header">
        <p className="title-block">{column.title}</p>
        <span className="column-count">{tasks.length}</span>
      </div>

      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="column-body" ref={setNodeRef}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onOpen={() => onOpenTask(task.id)}
              disabled={dragDisabled}
            />
          ))}
          {tasks.length === 0 && <p className="column-empty">No tasks</p>}
        </div>
      </SortableContext>

      {column.id === 'backlog' && <AddTaskForm status={column.id} />}
    </div>
  );
}
