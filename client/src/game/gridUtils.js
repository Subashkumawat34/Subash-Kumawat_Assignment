export const countTilesByType = (grid, type) => {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].type === type) count++;
  }
  return count;
};
