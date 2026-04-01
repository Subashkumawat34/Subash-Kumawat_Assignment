import React from 'react';
import './GameSelection.css';

export default function InfoPanel({ game }) {
  return (
    <div className="info-panel glass-panel animate-fade-in">
      <h3>How To Play</h3>
      <p className="description">{game.description}</p>
      <div className="instructions">
        <div className="step">
          <span className="step-num" style={{ background: game.colors[0] }}>1</span>
          <span>Memorize pattern</span>
        </div>
        <div className="step">
          <span className="step-num" style={{ background: game.colors[1] }}>2</span>
          <span>Match tiles</span>
        </div>
        <div className="step">
          <span className="step-num" style={{ background: 'var(--accent)' }}>3</span>
          <span>Beat the clock</span>
        </div>
      </div>
    </div>
  );
}
