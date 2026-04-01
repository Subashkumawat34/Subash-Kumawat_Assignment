import { countTilesByType } from './gridUtils';

export const applyTileEffect = (state, newRow, newCol) => {
  const { grid, score, lives, currentPattern } = state;
  const newGrid = [...grid.map(row => [...row])];
  const targetTile = newGrid[newRow][newCol];
  
  let newState = {
    ...state,
    playerPosition: { r: newRow, c: newCol },
    grid: newGrid
  };

  switch (targetTile.type) {
    case 'BLUE':
      // Collect blue tile
      targetTile.type = 'EMPTY';
      targetTile.isBlinking = false;
      newState.score = score + 50;
      newState.totalBlue = countTilesByType(newGrid, 'BLUE');
      break;
    case 'OBSTACLE':
      // Immediate death if hit Red block
      newState.lives = lives - 1;
      // Push player back to start if they have lives left
      if (newState.lives > 0) {
        newState.playerPosition = { r: 0, c: 4 }; // Return to start
      } else {
        newState.status = 'LOSE';
        newState.loseReason = 'You hit an obstacle and ran out of lives!';
      }
      break;
    case 'GREEN':
      // Reaching Green represents clearing the level
      if (currentPattern === 1) {
        newState.status = 'WON_PATTERN_1';
      } else {
        newState.status = 'WON_GAME';
      }
      // Add survival bonus
      newState.score += (newState.timeLeft * 10) + (newState.lives * 100);
      break;
    case 'EMPTY':
    default:
      // Normal move
      break;
  }

  return newState;
};
