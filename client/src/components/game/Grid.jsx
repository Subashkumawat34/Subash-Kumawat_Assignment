import React from 'react';
import Tile from './Tile';
import './Grid.css';

const Grid = ({ gridState, rows, cols, onTileClick }) => {
  if (!gridState || gridState.length === 0) return null;

  return (
    <div 
      className="grid-container" 
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`
      }}
    >
      {gridState.map((tile) => (
        <Tile 
          key={tile.id} 
          type={tile.type} 
          label={tile.label}
          isCollected={tile.isCollected} 
          isBlinking={tile.isBlinking} 
          onClick={() => onTileClick(tile.id)}
        />
      ))}
    </div>
  );
};

export default Grid;
