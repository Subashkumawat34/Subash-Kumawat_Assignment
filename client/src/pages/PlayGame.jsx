import React from 'react';
import GridGame from '../components/game/GridGame';

export default function PlayGame() {
  return (
    <div className="animate-fade-in" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <GridGame />
    </div>
  );
}
