function bfs(grid) {
  let ROWS = grid.length;
  let COLS = grid[0].length;
  let visited = new Set([`0,0`]);
  let queue = [[0, 0]];
  let steps = 0;

  while (queue.length) {
    let length = queue.length;

    for (let i = 0; i < length; i++) {
      const [row, col] = queue.shift();

      if (row === ROWS - 1 && col === COLS - 1) return steps;

      const neighbours = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      for (let [rowNeighbour, colNeighbour] of neighbours) {
        const newRow = row + rowNeighbour;
        const newCol = col + colNeighbour;
        const key = `${newRow},${newCol}`;

        if (Math.min(newRow, newCol) < 0) continue;
        if (newRow === ROWS || newCol === COLS) continue;
        if (grid[newRow][newCol] === 1) continue;
        if (visited.has(key)) continue;

        visited.add(key);
        queue.push([newRow, newCol]);
      }
    }

    steps++;
  }
}

const grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

console.log(bfs(grid));
