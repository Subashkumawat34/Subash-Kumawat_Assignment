import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={styles.container} className="animate-fade-in" >
      <div className="glass-panel" style={styles.hero}>
        <h1 style={styles.title}>
          <span style={styles.highlight}>Pattern</span> Matcher Pro
        </h1>
        <p style={styles.subtitle}>
          Test your memory and speed in this dynamic tile-based grid game. 
          See how quickly you can match the patterns!
        </p>
        
        <div style={styles.actionGroup}>
          <Link to="/game">
            <button className="btn-primary" style={styles.playButton}>
              Play Now
            </button>
          </Link>
          <Link to="/leaderboard" style={styles.secondaryLink}>
            View Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem',
  },
  hero: {
    textAlign: 'center',
    maxWidth: '600px',
    padding: '4rem 2rem',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '1rem',
    lineHeight: '1.2',
  },
  highlight: {
    color: 'var(--accent)',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    marginBottom: '2.5rem',
  },
  actionGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  },
  playButton: {
    fontSize: '1.2rem',
    padding: '1rem 3rem',
  },
  secondaryLink: {
    color: 'var(--primary)',
    fontWeight: '600',
    borderBottom: '2px solid transparent',
  }
};
