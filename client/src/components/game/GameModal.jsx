import React from 'react';
import './GameModal.css';

const GameModal = ({ status, reason, score, onRetry, onNext, onNewGrid }) => {
  if (status === 'IDLE' || status === 'PLAYING') return null;

  return (
    <div className="game-modal-backdrop">
      <div className={`game-modal ${status.toLowerCase()}`}>
        {status === 'WON_PATTERN_1' && (
          <>
            <h2>Pattern 1 Complete! 🎉</h2>
            <p className="score-display">Score: {score}</p>
            <p>Ready for the next challenge?</p>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={onNext}>Start Pattern 2</button>
            </div>
          </>
        )}

        {status === 'TRANSITION' && (
          <div className="transition-content">
            <h2>Loading Pattern 2...</h2>
            <div className="spinner"></div>
          </div>
        )}

        {status === 'WON_GAME' && (
          <>
            <h2>Victory! 🏆</h2>
            <p className="score-display">Final Score: {score}</p>
            <p>Your results have been saved.</p>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={onRetry}>Play Again</button>
              <button className="btn btn-secondary" onClick={onNewGrid}>New Grid</button>
            </div>
          </>
        )}

        {status === 'LOSE' && (
          <>
            <h2>Game Over 💀</h2>
            <p className="reason">{reason}</p>
            <p className="score-display">Final Score: {score}</p>
            <div className="modal-actions">
              <button className="btn btn-warning" onClick={onRetry}>Retry</button>
              <button className="btn btn-secondary" onClick={onNewGrid}>New Grid</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameModal;
