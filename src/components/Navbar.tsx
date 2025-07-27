import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/authSlice';

export const Navbar = () => {
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">News Aggregator</Link>

      <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        {menuOpen ? '×' : '☰'}
      </button>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {token ? (
          <>
            <Link to="/feed" className="navbar-link" onClick={() => setMenuOpen(false)}>Feed</Link>
            <Link to="/search" className="navbar-link" onClick={() => setMenuOpen(false)}>Search</Link>
            <Link to="/preferences" className="navbar-link" onClick={() => setMenuOpen(false)}>Preferences</Link>
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="navbar-logout">Logout</button>
          </>
        ) : (
          <Link to="/auth" className="navbar-login" onClick={() => setMenuOpen(false)}>Login</Link>
        )}
      </div>
    </nav>
  );
};
