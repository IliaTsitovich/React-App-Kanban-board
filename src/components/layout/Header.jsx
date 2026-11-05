import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import { useTheme } from '../../context/ThemeContext';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import './Header.scss';

const sunIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
  </svg>
);

const moonIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
  </svg>
);

const chevronIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 9 7 7 7-7" />
  </svg>
);

export function Header() {
  const { profile, exitProfile } = useProfile();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useOnClickOutside(menuRef, () => setMenuOpen(false));

  function handleSwitchProfile() {
    setMenuOpen(false);
    exitProfile();
    navigate('/profiles', { replace: true });
  }

  return (
    <header className="header">
      <div className="container__header">
        <NavLink className="main-title_Link" to="/">
          Awesome Kanban Board
        </NavLink>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? sunIcon : moonIcon}
          </button>

          {profile && (
            <div
              className="container__avatar"
              ref={menuRef}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setMenuOpen(false);
              }}
            >
              <button
                type="button"
                className="user-image"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="username-label">{profile.username}</span>
                {chevronIcon}
              </button>
              {menuOpen && (
                <div className="container__menu_avatar">
                  <ul className="profile__menu">
                    <li>
                      <button type="button" className="item__profile-menu" onClick={handleSwitchProfile}>
                        Switch profile
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
