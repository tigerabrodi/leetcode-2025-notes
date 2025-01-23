# Number of Islands

```js
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let ROWS = grid.length;
  let COLUMNS = grid[0].length;
  let count = 0;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      if (grid[row][col] === "1") {
        count++;
        floodFill(grid, row, col);
      }
    }
  }

  return count;
};

function floodFill(grid, row, col) {
  if (Math.min(row, col) < 0) return;
  if (row === grid.length || col === grid[0].length) return;
  if (grid[row][col] === "0" || grid[row][col] === "2") return;

  grid[row][col] = "2";

  floodFill(grid, row + 1, col);
  floodFill(grid, row - 1, col);
  floodFill(grid, row, col - 1);
  floodFill(grid, row, col + 1);
}
```

islands are 1s, only valid of horizontally or vertically connected

this works by updating it in place

the flood fill is a dfs that updates the grid in place to mark the islands as visited

everytime we find a 1, we know its connected to an island, so we can just mark it as visited and call flood fill on the 4 directions to see how it expands
