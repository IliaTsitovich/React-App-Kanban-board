import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import './Header.scss';

const userIcon = (
  <svg className="image__Avatar" width="32" height="32" viewBox="0 0 40 40" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 39.2C30.6039 39.2 39.2 30.6039 39.2 20C39.2 9.39612 30.6039 0.799988 20 0.799988C9.39612 0.799988 0.799988 9.39612 0.799988 20C0.799988 30.6039 9.39612 39.2 20 39.2Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
    <path d="M23.9464 28.4224C23.8296 27.1328 23.8744 26.2328 23.8744 25.0544C24.4584 24.748 25.5048 22.7944 25.6816 21.144C26.1408 21.1064 26.8648 20.6584 27.0768 18.8896C27.1912 17.94 26.7368 17.4056 26.46 17.2376C27.2072 14.9904 28.7592 8.03841 23.5896 7.32001C23.0576 6.38561 21.6952 5.91281 19.9248 5.91281C12.8416 6.04321 11.9872 11.2616 13.54 17.2376C13.264 17.4056 12.8096 17.94 12.9232 18.8896C13.136 20.6584 13.8592 21.1064 14.3184 21.144C14.4944 22.7936 15.5824 24.748 16.168 25.0544C16.168 26.2328 16.212 27.1328 16.0952 28.4224C15.0864 31.1344 9.90561 31.3464 6.91681 33.9616C10.0416 37.108 15.1056 39.3584 20.4496 39.3584C25.7936 39.3584 32.0752 35.1392 33.1208 33.988C30.1504 31.3488 24.9576 31.144 23.9464 28.4224Z" fill="black" />
  </svg>
);

export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useOnClickOutside(menuRef, () => setMenuOpen(false));

  function handleLogout() {
    setMenuOpen(false);
    logout();
    toast.success('Logged out.');
    navigate('/login', { replace: true });
  }

  return (
    <header className="header">
      <div className="container__header">
        <NavLink className="main-title_Link" to="/">
          <p>Awesome Kanban Board</p>
        </NavLink>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div className="container__avatar" ref={menuRef}>
              <button type="button" className="user-image" onClick={() => setMenuOpen((v) => !v)}>
                {userIcon}
                <span className="username-label">{user.username}</span>
              </button>
              {menuOpen && (
                <div className="container__menu_avatar">
                  <ul className="profile__menu">
                    {user.role === 'admin' && (
                      <li className="item__profile-menu">
                        <NavLink to="/admin" onClick={() => setMenuOpen(false)}>
                          Admin panel
                        </NavLink>
                      </li>
                    )}
                    <li className="item__profile-menu" onClick={handleLogout}>
                      Log out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <nav className="auth-links">
              <NavLink to="/login">Log in</NavLink>
              <NavLink to="/register">Sign up</NavLink>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
