import { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { useBoard } from '../../context/BoardContext';
import { version } from '../../../package.json';
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
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
          <span className="title-label">Notes from the author: a demo, saved in this browser only</span>
        </summary>
        <ol>
          <li>I built this without a server, so your tasks stay in this browser and go if its data is cleared.</li>
          <li>I left profiles without passwords, so anyone using this browser can open them.</li>
          <li>Please don&apos;t store anything sensitive here.</li>
        </ol>
      </details>
      {profile && <BoardStatus />}
      <div className="title-cell">
        <span className="title-label">Source</span>
        <span className="title-value">
          <a
            className="title-measure"
            aria-label={`Source code on GitHub, version ${version}`}
            rel="noreferrer"
            target="_blank"
            href="https://github.com/IliaTsitovich/React-App-Kanban-board"
          >
            v{version}
          </a>
        </span>
      </div>
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
