import { useAuth } from '../../context/AuthContext';
import { useBoard } from '../../context/BoardContext';
import { Title } from '../common/Title';
import './Footer.scss';

export function Footer() {
  const { user } = useAuth();

  return (
    <footer className="footer-block">
      <div className="container-footer">
        {user && <BoardStats />}
        <div className="container-info_footer">
          <h4>Kanban board by</h4>
          <a rel="author noreferrer" target="_blank" href="https://github.com/IliaTsitovich">
            I.TSITOVICH
          </a>
          <h4>{new Date().getFullYear()}</h4>
        </div>
      </div>
    </footer>
  );
}

function BoardStats() {
  const { tasks, columns } = useBoard();
  return (
    <div className="count_container">
      <Title info="Active tasks: " count={tasks.length - columns.finished.length} />
      <Title info="Finished tasks: " count={columns.finished.length} />
    </div>
  );
}
