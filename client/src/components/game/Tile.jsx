import React, { memo } from 'react';
import './Tile.css';

const Tile = memo(({ type, label, isCollected, isBlinking, onClick }) => {
  let classes = 'tile';
  
  if (type === 'BLUE' && !isCollected) classes += ' tile-blue';
  else if (type === 'BLUE' && isCollected) classes += ' tile-collected';
  else if (type === 'OBSTACLE') classes += ' tile-obstacle';
  else if (type === 'GREEN') classes += ' tile-green';
  else classes += ' tile-empty';
  
  if (isBlinking) classes += ' blinking-red';

  return (
    <div className={classes} onClick={onClick}>
      <span className="tile-label">{label}</span>
    </div>
  );
});

Tile.displayName = 'Tile';

export default Tile;
