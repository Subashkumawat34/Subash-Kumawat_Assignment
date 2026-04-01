export const handleTileClick = (state, targetId) => {
  if (state.status !== 'PLAYING') return state;

  const { grid, score, lives, currentPattern } = state;
  const newGrid = [...grid.map(tile => ({ ...tile }))];
  const targetTile = newGrid[targetId];

  if (targetTile.isCollected || targetTile.isBlinking) return state; // Ignore repeated clicks

  let newState = {
    ...state,
    grid: newGrid
  };

  switch (targetTile.type) {
    case 'BLUE':
      // Collect blue tile
      targetTile.isCollected = true;
      newState.score = score + 1; // +1 score per video spec

      // Re-evaluate how many blue tiles are uncollected
      let uncollectedBlue = 0;
      for (let i = 0; i < newGrid.length; i++) {
        if (newGrid[i].type === 'BLUE' && !newGrid[i].isCollected && i !== targetId) {
          uncollectedBlue++;
        }
      }
      
      newState.totalBlue = uncollectedBlue;

      if (uncollectedBlue === 0) {
        // Collect all blue tiles -> WIN!
        if (currentPattern === 1) {
          newState.status = 'WON_PATTERN_1';
        } else {
          newState.status = 'WON_GAME';
        }
      }
      break;

    case 'OBSTACLE':
      // Hit obstacle
      newState.lives = lives - 1;
      targetTile.isBlinking = true; // Trigger visual effect
      
      if (newState.lives <= 0) {
        newState.status = 'LOSE';
        newState.loseReason = 'You ran out of lives!';
      }
      break;

    case 'GREEN':
    case 'EMPTY':
    default:
      // Neutral - no effect
      break;
  }

  return newState;
};
