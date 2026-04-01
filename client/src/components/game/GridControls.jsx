import React from 'react';
import './GridControls.css';

const GridControls = ({
  onStart,
  onReset,
  playerName,
  onPlayerNameChange,
  status,
  currentPattern,
  inputRows,
  setInputRows,
  inputCols,
  setInputCols,
  selectedPattern,
  setSelectedPattern
}) => {
  const isPlaying = status === 'PLAYING';
  const isTransitioning = status === 'TRANSITION';

  return (
    <div className="grid-controls-container">
      {!isPlaying && status !== 'TRANSITION' && (
        <div className="pre-game-controls">
          <div className="control-group">
            <div className="grid-settings-row">
              <div className="setting-box">
                <label>Rows (Min 10)</label>
                <input type="number" min="10" value={inputRows} onChange={(e) => setInputRows(Math.max(10, parseInt(e.target.value) || 10))} className="name-input small-input" />
              </div>
              <div className="setting-box">
                <label>Cols (Min 10)</label>
                <input type="number" min="10" value={inputCols} onChange={(e) => setInputCols(Math.max(10, parseInt(e.target.value) || 10))} className="name-input small-input" />
              </div>
              <div className="setting-box">
                <label>Pattern</label>
                <select value={selectedPattern} onChange={(e) => setSelectedPattern(parseInt(e.target.value))} className="name-input small-input">
                  <option value={1}>P1</option>
                  <option value={2}>P2</option>
                </select>
              </div>
            </div>
          </div>
          <div className="control-group">
            <label>Player Name:</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => onPlayerNameChange(e.target.value)}
              placeholder="Enter name (Required)"
              className="name-input"
              maxLength={15}
            />
          </div>
        </div>
      )}

      <div className="action-buttons">
        {(status === 'IDLE' || status === 'WON_GAME' || status === 'LOSE') && (
          <button 
            className="btn btn-primary start-btn" 
            onClick={onStart}
            disabled={!playerName.trim()}
          >
            {status === 'IDLE' ? 'Start Game' : 'Play Again'}
          </button>
        )}

        {(isPlaying || isTransitioning) && (
          <button className="btn btn-warning reset-btn" onClick={onReset}>
            Reset / End Game
          </button>
        )}
      </div>
      
      {currentPattern > 1 && !isPlaying && status !== 'TRANSITION' && (
        <div className="pattern-badge">Currently on Pattern {currentPattern}</div>
      )}
    </div>
  );
};

export default GridControls;
