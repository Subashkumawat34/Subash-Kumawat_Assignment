export const handleTileClick = (state, targetId) => {
  if (state.status !== 'PLAYING') return state;

  const { grid, baseGrid, score, lives, currentPattern } = state;
  const newBaseGrid = [...baseGrid.map(tile => ({ ...tile }))];
  const newGrid = [...grid.map(tile => ({ ...tile }))];
  
  // Find the tile in baseGrid and current grid
  const baseTile = newBaseGrid[targetId];
  const currentTile = newGrid[targetId];

  if (baseTile.isCollected || baseTile.isBlinking) return state; // Ignore repeated clicks

  let newState = {
    ...state,
    baseGrid: newBaseGrid,
    grid: newGrid
  };

  // The type for logic should be based on what's visible (currentTile.type)
  // This fulfills "Red Priority": if it's currently OBSTACLE, it stays OBSTACLE
  switch (currentTile.type) {
    case 'BLUE':
      // Collect blue tile - update BOTH grids
      baseTile.isCollected = true;
      currentTile.isCollected = true;
      newState.score = score + 1; 

      // Re-evaluate how many blue tiles are uncollected in BASE grid
      let uncollectedBlue = 0;
      for (let i = 0; i < newBaseGrid.length; i++) {
        if (newBaseGrid[i].type === 'BLUE' && !newBaseGrid[i].isCollected) {
          uncollectedBlue++;
        }
      }
      
      newState.totalBlue = uncollectedBlue;

      if (uncollectedBlue === 0) {
        // Collect all blue tiles -> WIN!
        newState.status = currentPattern === 1 ? 'WON_PATTERN_1' : 'WON_GAME';
      }
      break;

    case 'OBSTACLE':
      // Hit obstacle - update BOTH
      newState.lives = lives - 1;
      baseTile.isBlinking = true; 
      currentTile.isBlinking = true;
      
      if (newState.lives <= 0) {
        newState.status = 'LOSE';
        newState.loseReason = 'You ran out of lives!';
      }
      break;

    case 'GREEN':
    case 'EMPTY':
    default:
      break;
  }

  return newState;
};
