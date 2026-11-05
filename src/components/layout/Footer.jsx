import { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { useBoard } from '../../context/BoardContext';
import './Footer.scss';

function isWideViewport() {
  return window.matchMedia?.('(min-width: 768px)').matches ?? true;
}

export function Footer() {
  const { profile } = useProfile();
  const [notesOpen, setNotesOpen] = useState(isWideViewport);

  return (
    <footer className="title-block">
      <details
        className="title-cell title-notes"
        open={notesOpen}
        onToggle={(e) => setNotesOpen(e.currentTarget.open)}
      >
        <summary>
          <span className="title-label">Notes: demo, saved only in this browser</span>
        </summary>
        <ol>
          <li>Tasks are saved only in this browser and are lost if its data is cleared.</li>
          <li>Profiles have no passwords, so anyone using this browser can open them.</li>
          <li>Don&apos;t store anything sensitive here.</li>
        </ol>
      </details>
      {profile && <BoardStatus />}
      <div className="title-cell">
        <span className="title-label">Drawn by</span>
        <span className="title-value">
          <a rel="author noreferrer" target="_blank" href="https://github.com/IliaTsitovich">
            I. Tsitovich
          </a>
        </span>
      </div>
    </footer>
  );
}

function BoardStatus() {
  const { tasks, columns } = useBoard();
  return (
    <div className="title-cell">
      <span className="title-label">Status</span>
      <span className="title-value title-status">
        <span>
          <span className="title-status-count">{tasks.length - columns.finished.length}</span>
          <span className="title-status-name">active</span>
        </span>
        <span>
          <span className="title-status-count">{columns.finished.length}</span>
          <span className="title-status-name">finished</span>
        </span>
      </span>
    </div>
  );
}
