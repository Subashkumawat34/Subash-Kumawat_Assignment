import React, { useState, useEffect } from 'react';
import { scoreService } from '../services/api';
import './Leaderboard.css';

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError(null);
        // We assume scoreService.getLeaderboard returns an array of the top scores
        const data = await scoreService.getLeaderboard();
        
        // Handle axios wrapping if it exists, otherwise just the array
        const results = Array.isArray(data) ? data : (data.data || []);
        
        // Limit to top 10 as per specs if backend doesn't already
        setScores(results.slice(0, 10));
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        setError('Failed to connect to the leaderboard. The API might be down.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Helper to assign trophy colors
  const getRankClass = (index) => {
    if (index === 0) return 'rank-1';
    if (index === 1) return 'rank-2';
    if (index === 2) return 'rank-3';
    return '';
  };

  return (
    <div className="leaderboard-container animate-fade-in">
      <h1>🏆 Top 10 Players</h1>

      {error ? (
        <div className="error-state">
          <h3>Oops! Something went wrong.</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{ marginTop: '15px', padding: '10px 20px', cursor: 'pointer', background: 'transparent', border: '1px solid #ff4757', color: '#ff4757', borderRadius: '5px' }}
          >
            Retry Connection
          </button>
        </div>
      ) : (
        <div className="leaderboard-table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
                <th>Grid</th>
                <th>Pattern</th>
                <th>Time Left</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // 10 loading skeletons
                [...Array(10)].map((_, i) => (
                  <tr key={i} className="skeleton-row">
                    <td><div className="skeleton skeleton-short"></div></td>
                    <td><div className="skeleton skeleton-name"></div></td>
                    <td><div className="skeleton skeleton-score"></div></td>
                    <td><div className="skeleton skeleton-short"></div></td>
                    <td><div className="skeleton skeleton-short"></div></td>
                    <td><div className="skeleton skeleton-short"></div></td>
                  </tr>
                ))
              ) : scores.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    No scores yet. Be the first to play!
                  </td>
                </tr>
              ) : (
                scores.map((score, index) => (
                  <tr key={score._id || index}>
                    <td className={`rank-cell ${getRankClass(index)}`}>
                      #{index + 1}
                    </td>
                    <td style={{ fontWeight: '500' }}>
                      {score.playerName || 'Anonymous'}
                    </td>
                    <td className="score-cell">
                      {score.score}
                    </td>
                    <td>
                      {score.details?.gridSize || '-'}
                    </td>
                    <td>
                      {score.details?.pattern || '-'}
                    </td>
                    <td>
                      {score.details?.timeLeft !== undefined ? `${score.details.timeLeft}s` : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
