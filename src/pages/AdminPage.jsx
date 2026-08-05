import { UsersTable } from '../components/admin/UsersTable';
import './AdminPage.scss';

export function AdminPage() {
  return (
    <main className="admin-page">
      <h1>Admin panel</h1>
      <p className="admin-subtitle">Manage registered accounts.</p>
      <UsersTable />
    </main>
  );
}
