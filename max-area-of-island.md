# Max Area of Island

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let ROWS = grid.length;
  let COLUMNS = grid[0].length;
  let maxArea = 0;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      if (grid[row][col] === 1) {
        let newArea = floodFill(grid, row, col);
        maxArea = Math.max(newArea, maxArea);
      }
    }
  }

  return maxArea;
};

function floodFill(grid, row, col) {
  if (Math.min(row, col) < 0) return 0;
  if (row === grid.length || col === grid[0].length) return 0;
  if (grid[row][col] === 2 || grid[row][col] === 0) return 0;

  let count = 1;
  grid[row][col] = 2;

  count += floodFill(grid, row + 1, col);
  count += floodFill(grid, row - 1, col);
  count += floodFill(grid, row, col - 1);
  count += floodFill(grid, row, col + 1);

  return count;
}
```

this is the same as number of islands

the difference here though is that we wanna count the area of the island

everytime we get the result, we update it with the max of our current result and the new result

inside the flood fill, we update the grid in place to mark the islands as visited

count starts at 1 because we are counting the current cell
