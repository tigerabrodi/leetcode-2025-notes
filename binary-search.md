# Binary Search

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let L = 0;
  let R = nums.length - 1;

  while (L <= R) {
    const mid = Math.floor((L + R) / 2);

    if (target > nums[mid]) {
      L = mid + 1;
    } else if (target < nums[mid]) {
      R = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
};
```

Binary search is a simple one, we just need to keep track of the left and right pointers, and then we can just keep moving them until we find the target

the time complexity here is log n because we are halving the search space each time

we wanna do L <= R, because if we have a single element, we want to check it still, since that could be the target!

otherwise we just check greater or less than to determine where to move the pointers or if we found the target!
