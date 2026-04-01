import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import GridGame from '../components/game/GridGame';

export default function PlayGame() {
  const { gameId } = useParams();

  // Currently we only have Grid Game fully implemented
  if (gameId !== 'grid') {
    return (
      <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>
        <h2>Game "{gameId}" is not yet available to play.</h2>
        <button 
          onClick={() => window.history.back()}
          style={{ padding: '10px 20px', background: '#1e90ff', color: 'white', border: 'none', borderRadius: '5px', marginTop: '20px', cursor: 'pointer' }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <GridGame />
    </div>
  );
}
