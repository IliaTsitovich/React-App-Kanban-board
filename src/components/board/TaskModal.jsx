import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Modal } from '../common/Modal';
import Button from '../common/Button';
import { TASK_DELETED_TOAST, useBoard } from '../../context/BoardContext';
import { taskSchema } from '../../lib/validation';
import { PRIORITIES } from '../../lib/tasks';
import './TaskModal.scss';

export function TaskModal({ taskId, onClose }) {
  const { tasks, updateTask, deleteTask, restoreTask } = useBoard();
  const task = tasks.find((t) => t.id === taskId);
  const [confirmingDiscard, setConfirmingDiscard] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
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

  function close() {
    setConfirmingDiscard(false);
    onClose();
  }

  // Dismissing twice (Escape, then Escape) is a deliberate discard.
  function requestClose() {
    if (isDirty && !confirmingDiscard) {
      setConfirmingDiscard(true);
    } else {
      close();
    }
  }

  function onSubmit(data) {
    updateTask(task.id, { ...data, dueDate: data.dueDate || null });
    toast.success('Task saved.');
    close();
  }

  function handleDelete() {
    deleteTask(task.id);
    toast.success('Task deleted.', {
      id: TASK_DELETED_TOAST,
      duration: 8000,
      action: { label: 'Undo', onClick: () => restoreTask(task) },
    });
    close();
  }

  return (
    <Modal open={Boolean(task)} onClose={requestClose} title="Edit task">
      <form className="task-modal-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="field-label" htmlFor="task-title">
          Title
        </label>
        <input
          id="task-title"
          className="field-input"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'task-title-error' : undefined}
          {...register('title')}
        />
        {errors.title && (
          <p id="task-title-error" className="field-error" role="alert">
            {errors.title.message}
          </p>
        )}

        <label className="field-label" htmlFor="task-description">
          Description
        </label>
        <textarea
          id="task-description"
          className="area-text"
          rows={6}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? 'task-description-error' : undefined}
          {...register('description')}
        />
        {errors.description && (
          <p id="task-description-error" className="field-error" role="alert">
            {errors.description.message}
          </p>
        )}

        <div className="task-modal-row">
          <div>
            <label className="field-label" htmlFor="task-priority">
              Priority
            </label>
            <select id="task-priority" className="field-input" {...register('priority')}>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p[0].toUpperCase() + p.slice(1)}
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

        {confirmingDiscard ? (
          <div className="task-modal-discard" role="alert">
            <span>Discard your changes?</span>
            <Button className="button_secondary" onClick={() => setConfirmingDiscard(false)}>
              Keep editing
            </Button>
            <Button className="button_danger" onClick={close}>
              Discard
            </Button>
          </div>
        ) : (
          <div className="task-modal-actions">
            <Button type="button" className="button_danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button type="submit" className="submit_button validated">
              Save
            </Button>
          </div>
        )}
      </form>
    </Modal>
  );
}
