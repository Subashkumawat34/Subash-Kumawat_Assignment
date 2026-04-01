// 1. Dynamic Red Wave Generators
export const getRedPattern1 = (cols) => {
  const pattern = [];
  const mid = Math.floor(cols / 2);
  for(let i=1; i < mid; i++) {
    pattern.push([i, cols - 1 - i]);
  }
  pattern.push([mid - 1, cols - mid]); // Double the center to mimic original pacing
  for(let i=mid - 2; i >= 1; i--) {
    pattern.push([i, cols - 1 - i]);
  }
  // Ensure array is never empty for safety on edge case grid sizes
  return pattern.length ? pattern : [[0, 0]]; 
};

// Extracted explicitly from the reference video frame!
export const getRedPattern2 = (cols) => {
  if (cols === 10) {
    return [
      [], [], [], [], [], [], [], [], [], [],
      [], [], [], [], [4, 5, 7], [4, 5, 7], [7], [7], [], [],
      [], [], [], [], [], [], [], [], [], [2, 3, 4, 5]
    ];
  }
  
  const pattern = [];
  const mid = Math.floor(cols / 2);
  for(let i = mid - 1; i >= 0; i--) {
     pattern.push([i, cols - 1 - i]);
  }
  pattern.push([0, cols - 1]);
  for(let i = 1; i < mid - 1; i++) {
     pattern.push([i, cols - 1 - i]);
  }
  return pattern.length ? pattern : [[0, 0]];
};

// 2. Pattern 1: Target X Layout - Dynamically scales
export const generatePattern1 = (rows = 30, cols = 10) => {
  const grid = [];
  for (let i = 1; i <= rows * cols; i++) {
    grid.push({ id: i - 1, label: i, type: 'EMPTY', isCollected: false, isBlinking: false });
  }

  const mid = Math.floor(cols / 2);
  const cycleLength = mid || 1; 
  
  for (let r = 0; r < rows; r += 2) {
     const cyclePhase = Math.floor(r / 2) % cycleLength;
     const col1 = cyclePhase;
     const col2 = cols - 1 - cyclePhase;
     
     const idx1 = r * cols + col1;
     const idx2 = r * cols + col2;
     
     if (idx1 < rows * cols) grid[idx1].type = 'BLUE';
     if (idx2 < rows * cols && idx2 !== idx1) grid[idx2].type = 'BLUE';
  }
  return grid;
};

export const generatePattern2 = (rows = 30, cols = 10) => {
  const grid = [];
  for (let i = 1; i <= rows * cols; i++) {
    grid.push({ id: i - 1, label: i, type: 'EMPTY', isCollected: false, isBlinking: false });
  }

  // EXACT REPLICATION FOR BASE 10x30 Constraints
  if (cols === 10 && rows === 30) {
    const rawMap = [
      "B B B B B B B B B B",
      "0 G G G G G G G G 0",
      "0 G B 0 0 0 0 0 G 0",
      "0 G 0 0 0 0 0 B G 0",
      "0 G B 0 0 0 0 0 G 0",
      "0 G 0 0 0 0 0 B G 0",
      "0 G B 0 0 0 0 0 G 0",
      "0 G 0 0 0 0 0 B G 0",
      "0 G 0 0 0 0 0 0 G 0",
      "0 G 0 0 0 0 0 B G 0",
      "0 G 0 0 0 0 0 0 G 0",
      "0 G 0 0 0 0 0 B G 0",
      "0 G B 0 0 0 0 0 G 0",
      "0 G 0 G G G G B G 0",
      "0 G B G 0 0 G 0 G 0",
      "0 G 0 G 0 0 G 0 G 0",
      "0 G B G G G G 0 G 0",
      "0 G 0 0 0 0 0 0 G 0",
      "0 G B 0 0 0 0 0 G 0",
      "0 G 0 0 0 0 0 B G 0",
      "0 G B 0 0 0 0 0 G 0",
      "0 G 0 0 0 0 0 B G 0",
      "0 G B 0 0 0 0 0 G 0",
      "0 G 0 0 0 0 0 B G 0",
      "0 G B 0 0 0 0 0 G 0",
      "0 G 0 0 0 0 0 B G 0",
      "0 G B 0 0 0 0 0 G 0",
      "0 G 0 0 0 0 0 B G 0",
      "0 G G G G G G G G 0",
      "B B 0 0 0 0 B B B B" // Safe zones extracted (Red handles 0 spaces)
    ];

    for (let r = 0; r < 30; r++) {
      const chars = rawMap[r].replace(/ /g, "");
      for (let c = 0; c < 10; c++) {
        if (chars[c] === 'B') grid[r * cols + c].type = 'BLUE';
        if (chars[c] === 'G') grid[r * cols + c].type = 'GREEN';
      }
    }
    return grid;
  }

  // DYNAMIC FALLBACK MATH FOR SCALING (Any grid size)
  for (let c = 0; c < cols; c++) {
    if (c < rows * cols) grid[c].type = 'BLUE';
  }

  const mid = Math.floor(cols / 2);
  const redCycleLen = 2 * mid - 1; 

  for (let r = 1; r < rows; r++) {
    const leftWall = Math.min(1, cols - 1);
    const rightWall = Math.max(cols - 2, 0);
    const phase = redCycleLen > 0 ? r % redCycleLen : 0;
    const isKnot = redCycleLen > 0 && phase >= mid - 1 && phase <= mid + 1; 
    const isTargetRow = (r % 4 === 0) || isKnot;
    
    if (!isTargetRow || isKnot) {
       grid[r * cols + leftWall].type = 'GREEN';
       if(leftWall !== rightWall) grid[r * cols + rightWall].type = 'GREEN';
    }
    if (isTargetRow) {
       const tLeft = isKnot ? leftWall + 1 : leftWall;
       const tRight = isKnot ? rightWall - 1 : rightWall;
       if (tLeft < cols) grid[r * cols + tLeft].type = 'BLUE';
       if (tRight >= 0 && tRight !== tLeft) grid[r * cols + tRight].type = 'BLUE';
    }
    if (isKnot) {
       const kLeft = leftWall + 2;
       const kRight = rightWall - 2;
       if (kLeft < cols && kLeft <= rightWall) grid[r * cols + kLeft].type = 'GREEN';
       if (kRight >= 0 && kRight !== kLeft && kRight >= leftWall) grid[r * cols + kRight].type = 'GREEN';
    }
  }

  return grid;
};
