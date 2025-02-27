```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  if (grid[0][0] === 1) return -1;

  let ROWS = grid.length;
  let COLUMNS = grid[0].length;
  let queue = [[0, 0]];
  let visited = new Set(`0,0`);
  let length = 1;

  while (queue.length) {
    let lenSnapshot = queue.length;

    for (let i = 0; i < lenSnapshot; i++) {
      const [row, col] = queue.shift();

      if (row === ROWS - 1 && col === COLUMNS - 1) return length;

      const neighbors = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1],
      ];

      for (const [rowDir, colDir] of neighbors) {
        const newRow = row + rowDir;
        const newCol = col + colDir;
        const key = `${newRow},${newCol}`;

        if (Math.min(newRow, newCol) < 0) continue;
        if (newRow === ROWS || newCol === COLUMNS) continue;
        if (grid[newRow][newCol] === 1 || visited.has(key)) continue;

        visited.add(key);
        queue.push([newRow, newCol]);
      }
    }

    length++;
  }

  return -1;
};
```

The idea here is BFS to find the shortest path in a binary matrix. This includes not just going horizontally or vertically, but also diagonally. That's why neighbors as you see, are 8 in total.

For every row and column, we first check if we found our target, if not, we then explore all neighbors.

We add all valid neighbors to the queue and visited set. When done exploring all neighbors, we move onto the next iteration, before doing so, we increment length.

We loop through the next level and follow the same process.
