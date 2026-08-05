import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Modal } from '../common/Modal';
import Button from '../common/Button';
import { useBoard } from '../../context/BoardContext';
import { taskSchema } from '../../lib/validation';
import { PRIORITIES } from '../../lib/tasks';
import './TaskModal.scss';

export function TaskModal({ taskId, onClose }) {
  const { tasks, updateTask, deleteTask } = useBoard();
  const task = tasks.find((t) => t.id === taskId);

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(taskSchema),
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate ?? '',
      });
    }
  }, [task, reset]);

  if (!task) return null;

  function onSubmit(data) {
    updateTask(task.id, { ...data, dueDate: data.dueDate || null });
    toast.success('Task saved.');
    onClose();
  }

  function handleDelete() {
    deleteTask(task.id);
    toast.success('Task deleted.');
    onClose();
  }

  return (
    <Modal open={Boolean(task)} onClose={onClose} title="Edit task">
      <form className="task-modal-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="field-label" htmlFor="task-title">
          Title
        </label>
        <input id="task-title" className="field-input" {...register('title')} />

        <label className="field-label" htmlFor="task-description">
          Description
        </label>
        <textarea id="task-description" className="area-text" rows={6} {...register('description')} />

        <div className="task-modal-row">
          <div>
            <label className="field-label" htmlFor="task-priority">
              Priority
            </label>
            <select id="task-priority" className="field-input" {...register('priority')}>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="task-due">
              Due date
            </label>
            <input id="task-due" type="date" className="field-input" {...register('dueDate')} />
          </div>
        </div>

        <div className="task-modal-actions">
          <Button type="button" className="button_danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button type="submit" className="submit_button validated">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
