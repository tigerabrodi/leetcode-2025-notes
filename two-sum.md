```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let hash = {};

  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];

    if (hash[diff] !== undefined) {
      return [hash[diff], i];
    }

    hash[nums[i]] = i;
  }
};
```

the trick to this one is using a hash map

we store all the numbers and map them to their index

we wanna return an array of the two indices that add up to the target

by subtracting the target from the current number, we get the difference, the difference added with nums[i] should equal the target

thats how we know if it exists in the hash map, then we return the index of the difference and the current index
