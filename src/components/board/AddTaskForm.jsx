import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useBoard } from '../../context/BoardContext';
import { taskSchema } from '../../lib/validation';
import Button from '../common/Button';

export function AddTaskForm({ status }) {
  const { addTask } = useBoard();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: '', description: '', priority: 'medium', dueDate: '' },
  });

  function onSubmit(data) {
    addTask(status, data);
    toast.success('Task added.');
    reset();
    setOpen(false);
  }

  if (!open) {
    return (
      <Button className="button_add backlog active" onClick={() => setOpen(true)}>
        + Add card
      </Button>
    );
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="input-task"
        placeholder="Write new task..."
        autoFocus
        {...register('title')}
      />
      {errors.title && (
        <p className="field-error" role="alert">
          {errors.title.message}
        </p>
      )}
      <div className="add-task-actions">
        <Button type="submit" className="submit_button validated">
          Add
        </Button>
        <Button
          type="button"
          className="button_secondary"
          onClick={() => {
            reset();
            setOpen(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
