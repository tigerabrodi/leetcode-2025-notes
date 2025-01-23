```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  let hash = {};

  for (let i = 0; i < nums.length; i++) {
    if (hash[nums[i]]) return true;

    hash[nums[i]] = true;
  }

  return false;
};
```

this one is super simple

we just check if number already exists in the hash map, if so return true, which breaks the loop and returns it out of the function

otherwise we add it to the hash map

if loop done, return false
