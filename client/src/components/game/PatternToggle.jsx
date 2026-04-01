import React from 'react';
import './PatternToggle.css';

const PatternToggle = ({ currentPattern, onSelectPattern, disabled }) => {
  return (
    <div className="pattern-toggle-container">
      <div 
        className={`pattern-btn ${currentPattern === 1 ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={() => !disabled && onSelectPattern(1)}
      >
        Pattern 1
      </div>
      <div 
        className={`pattern-btn ${currentPattern === 2 ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={() => !disabled && onSelectPattern(2)}
      >
        Pattern 2
      </div>
    </div>
  );
};

export default PatternToggle;
