import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? styles.activeLink : styles.link;
  };

  return (
    <nav style={styles.nav} className="glass-panel">
      <div style={styles.navContent}>
        <Link to="/" style={styles.logo}>
          <div style={styles.logoIcon}></div>
          <span style={styles.logoText}>GridMaster</span>
        </Link>
        <div style={styles.links}>
          <Link to="/" style={isActive('/')}>Home</Link>
          <Link to="/game" style={isActive('/game')}>Play</Link>
          <Link to="/leaderboard" style={isActive('/leaderboard')}>Leaderboard</Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    margin: '1rem 2rem',
    padding: '1rem 2rem',
    borderRadius: '100px',
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
  },
  logoIcon: {
    width: '24px',
    height: '24px',
    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
    borderRadius: '6px',
    transform: 'rotate(45deg)',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: '800',
    letterSpacing: '1px',
    color: 'var(--text-main)'
  },
  links: {
    display: 'flex',
    gap: '2rem',
  },
  link: {
    fontWeight: '600',
    color: 'var(--text-muted)',
    transition: 'color 0.3s ease',
  },
  activeLink: {
    fontWeight: '600',
    color: 'var(--text-main)',
    textShadow: '0 0 10px rgba(255,255,255,0.3)'
  }
};
