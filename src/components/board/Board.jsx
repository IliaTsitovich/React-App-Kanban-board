import { useMemo, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useBoard } from '../../context/BoardContext';
import { COLUMNS } from '../../lib/tasks';
import { Column } from './Column';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import './Board.scss';

export function Board() {
  const { tasks, columns, moveTask } = useBoard();
  const [query, setQuery] = useState('');
  const [openTaskId, setOpenTaskId] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const dragDisabled = Boolean(query.trim());

  const filteredColumns = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return columns;
    return Object.fromEntries(
      Object.entries(columns).map(([status, list]) => [
        status,
        list.filter((t) => t.title.toLowerCase().includes(q)),
      ])
    );
  }, [columns, query]);

  function handleDragStart(event) {
    setActiveTask(tasks.find((t) => t.id === event.active.id) ?? null);
  }

  function handleDragEnd(event) {
    setActiveTask(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const overData = over.data.current;
    const overStatus = overData?.status ?? over.id;
    const overColumn = columns[overStatus];
    if (!overColumn) return;

    const toIndex =
      overData?.type === 'task' ? overColumn.findIndex((t) => t.id === over.id) : overColumn.length;

    moveTask(active.id, overStatus, toIndex);
  }

  return (
    <main className="board">
      <div className="board-toolbar">
        <input
          className="board-search"
          type="search"
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search tasks"
        />
        {dragDisabled && <span className="board-search-hint">Clear search to drag cards</span>}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="board-columns">
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={filteredColumns[column.id]}
              onOpenTask={setOpenTaskId}
              dragDisabled={dragDisabled}
            />
          ))}
        </div>
        <DragOverlay>{activeTask ? <TaskCard task={activeTask} overlay /> : null}</DragOverlay>
      </DndContext>

      <TaskModal taskId={openTaskId} onClose={() => setOpenTaskId(null)} />
    </main>
  );
}
