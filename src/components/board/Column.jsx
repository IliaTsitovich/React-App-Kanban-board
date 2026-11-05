import { useDndContext, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { AddTaskForm } from './AddTaskForm';
import './Column.scss';

export function Column({ column, tasks, onOpenTask, dragDisabled }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { type: 'column', status: column.id },
  });

  const { active, over } = useDndContext();
  const fromStatus = active?.data.current?.status;
  const toStatus = active ? over?.data.current?.status : undefined;
  const isMoving = Boolean(toStatus) && toStatus !== fromStatus;
  const isDropTarget = toStatus === column.id;

  let countChange = 0;
  if (isMoving && toStatus === column.id) countChange = 1;
  if (isMoving && fromStatus === column.id) countChange = -1;

  const columnClasses = ['column'];
  if (isDropTarget) columnClasses.push('column_drop-target');
  if (toStatus && !isDropTarget && column.id !== fromStatus) columnClasses.push('column_receding');

  return (
    <section className={columnClasses.join(' ')}>
      <h2 className="column-title">
        {column.title}
        <span className="visually-hidden">: {tasks.length} tasks</span>
      </h2>
      <div className={`dimension${countChange ? ' dimension_revised' : ''}`} aria-hidden="true">
        <span className="dimension-value">
          {countChange !== 0 && <s className="dimension-old">{tasks.length}</s>}
          <span key={tasks.length + countChange} className="dimension-new">
            {tasks.length + countChange}
          </span>
        </span>
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
          {tasks.length === 0 && (
            <p className="column-empty">{dragDisabled ? 'No matches' : 'Drop cards here'}</p>
          )}
        </div>
      </SortableContext>

      {column.id === 'backlog' && <AddTaskForm status={column.id} />}
    </section>
  );
}
