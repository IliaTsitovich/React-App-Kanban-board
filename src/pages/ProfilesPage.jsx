import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useProfile } from '../context/ProfileContext';
import { CreateProfileForm } from '../components/profiles/CreateProfileForm';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import Button from '../components/common/Button';
import './ProfilesPage.scss';

export function ProfilesPage() {
  const { profiles, selectProfile, deleteProfile } = useProfile();
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();

  function handleSelect(id) {
    selectProfile(id);
    navigate('/', { replace: true });
  }

  function confirmDelete() {
    deleteProfile(pendingDelete.id);
    toast.success(`Deleted ${pendingDelete.username}.`);
    setPendingDelete(null);
  }

  return (
    <main className="profiles-page">
      <div className="profiles-card">
        <h1>{profiles.length > 0 ? 'Choose a profile' : 'Create a profile to start'}</h1>
        {profiles.length === 0 && (
          <p className="profiles-intro">
            A drag-and-drop Kanban board. New boards start with a few examples to try.
          </p>
        )}
        {profiles.length > 0 && (
          <ul className="profiles-list">
            {profiles.map((p) => (
              <li key={p.id} className="profiles-item">
                <Button className="profiles-open" onClick={() => handleSelect(p.id)}>
                  {p.username}
                </Button>
                <Button className="button_secondary" onClick={() => setPendingDelete(p)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
        <CreateProfileForm />
      </div>
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete profile"
        message={
          pendingDelete
            ? `Delete "${pendingDelete.username}" and all of its tasks? This cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </main>
  );
}
