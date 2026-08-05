import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { STORAGE_KEYS } from '../../lib/storageKeys';
import { ConfirmDialog } from '../common/ConfirmDialog';
import Button from '../common/Button';

function taskCountFor(userId) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.board(userId));
    return raw ? JSON.parse(raw).length : 0;
  } catch {
    return 0;
  }
}

export function UsersTable() {
  const { user: currentUser, users, setRole, deleteUser } = useAuth();
  const [pendingDelete, setPendingDelete] = useState(null);

  function handleToggleRole(target) {
    const nextRole = target.role === 'admin' ? 'user' : 'admin';
    const result = setRole(target.id, nextRole);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success(`${target.username} is now ${nextRole === 'admin' ? 'an admin' : 'a regular user'}.`);
  }

  function confirmDelete() {
    const result = deleteUser(pendingDelete.id);
    if (!result.ok) {
      toast.error(result.error);
    } else {
      toast.success(`Deleted ${pendingDelete.username}.`);
    }
    setPendingDelete(null);
  }

  return (
    <>
      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Tasks</th>
              <th>Joined</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  {u.username}
                  {u.id === currentUser.id && <span className="you-badge"> (you)</span>}
                </td>
                <td>{u.email}</td>
                <td>
                  <span className={`role-badge role-${u.role}`}>{u.role}</span>
                </td>
                <td>{taskCountFor(u.id)}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="users-table-actions">
                  <Button className="button_secondary" onClick={() => handleToggleRole(u)}>
                    {u.role === 'admin' ? 'Demote' : 'Promote'}
                  </Button>
                  <Button className="button_danger" onClick={() => setPendingDelete(u)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete account"
        message={
          pendingDelete
            ? `Delete "${pendingDelete.username}" and all of their tasks? This cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
