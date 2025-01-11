# Search a 2D Matrix

```js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const COLUMNS = matrix[0].length;
  const ROWS = matrix.length;

  let top = 0;
  let bottom = ROWS - 1;

  let targetRow = null;

  while (top <= bottom) {
    let mid = Math.floor((top + bottom) / 2);
    let row = matrix[mid];

    let firstVal = row[0];
    let lastVal = row[COLUMNS - 1];

    if (target >= firstVal && target <= lastVal) {
      targetRow = row;
      break;
    } else if (target > lastVal) {
      top = mid + 1;
    } else {
      bottom = mid - 1;
    }
  }

  if (targetRow === null) return false;

  let L = 0;
  let R = targetRow.length - 1;

  while (L <= R) {
    let mid = Math.floor((L + R) / 2);

    if (target > targetRow[mid]) {
      L = mid + 1;
    } else if (target < targetRow[mid]) {
      R = mid - 1;
    } else {
      return true;
    }
  }

  return false;
};
```

the latter part is just a normal binary search

well the first part too, to an extent, it may be confusing

but essentially we have rows and columns

```js
const COLUMNS = matrix[0].length;
const ROWS = matrix.length;

let top = 0;
let bottom = ROWS - 1;

let targetRow = null;

while (top <= bottom) {
  let mid = Math.floor((top + bottom) / 2);
  let row = matrix[mid];

  let firstVal = row[0];
  let lastVal = row[COLUMNS - 1];

  if (target >= firstVal && target <= lastVal) {
    targetRow = row;
    break;
  } else if (target > lastVal) {
    top = mid + 1;
  } else {
    bottom = mid - 1;
  }
}
```

we need to do a binary search top down to find the row that contains the target

to find if the target is in the row, we check if the target is greater than or equal to the first value and less than or equal to the last value of the row

equal is fine because it could be the target, so that's totally cool

otherwise if the target is greater than the last value, we know it's not in that row, so we move the top down

or the else case, which we know for a fact gotta be less than the first value, so we move the bottom up
