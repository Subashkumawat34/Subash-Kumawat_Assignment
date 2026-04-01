import React from 'react';
import './HUD.css';

const HUD = ({ lives, timeLeft, score, playerName, currentPattern, totalBlue }) => {
  return (
    <div className="hud-container">
      <div className="hud-top">
        <span className="player-name">{playerName || 'Player'}</span>
        <span className="score">Score: {score}</span>
      </div>
      
      <div className="hud-stats">
        <div className="stat-box">
          <span className="icon">❤️</span>
          <span className="value">x {lives}</span>
        </div>
        
        <div className="stat-box timer">
          <span className="icon">⏱️</span>
          <span className={`value ${timeLeft <= 5 ? 'danger-time' : ''}`}>
            {timeLeft}s
          </span>
        </div>
        
        <div className="stat-box pattern-info">
          <span>Pattern {currentPattern}</span>
          <span className="small">({totalBlue} blue left)</span>
        </div>
      </div>
    </div>
  );
};

export default HUD;
