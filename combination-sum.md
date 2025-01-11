# Combination Sum

```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  let res = [];

  function dfs(i, currentRes, totalSum) {
    if (totalSum === target) {
      res.push(currentRes.slice());
      return;
    }

    if (i === candidates.length || totalSum > target) {
      return;
    }

    currentRes.push(candidates[i]);

    dfs(i, currentRes, totalSum + candidates[i]);

    currentRes.pop();

    dfs(i + 1, currentRes, totalSum);
  }

  dfs(0, [], 0);
  return res;
};
```

this one was tricky

i spent like triple the time on it compared to subset and path sum combined

it was tricky because it felt like a different mental model where we do the checks and then we do the adding + dfs calls

the problem is that we wanna find all the possible combinations that add up to the target, and we wanna return an array containing all the combinations, so an array of arrays

the base cases should be understandable

if total sum is target, we know not to continue the recursion, motherwise it'd be too much

if i is out of bounds or total sum is greater than target, we stop as well

we then wanna continue exhausting the first path, so we add the current candidate to the currentRes array, and we call dfs again with the same index, this way we're exhausting the first path

when we return back up

we pop

and we take the next candidate, i think its worth mentioning that the same thing will happen as we move back up the call stack

when we take the next candidate

we actually need to do the same thing for the next candidate

when we call `dfs(i + 1, currentRes, totalSum)` nothing will happen

the real deal is when we call `dfs(i, currentRes, totalSum + candidates[i])`, that's when we actually try to find the next path

let's do a small example

we have the candidates array `[2,3,7]` and the target is `7`

we start with `dfs(0, [], 0)`

we add `2` to the currentRes array, and we call `dfs(0, [2], 2)`

we add `2` to the currentRes array, and we call `dfs(0, [2,2], 4)`

we add `2` to the currentRes array, and we call `dfs(0, [2,2,2], 6)`

we add `2` to the currentRes array, and we call `dfs(0, [2,2,2,2], 8)` (THE KEY HERE IS UNDERSTANDING THAT WE CAN KEEP EXHAUSTING THE SAME NUMBER OVER AND OVER TILL WE HIT SUM OR ITS GREATER THAN SUM)

this doesn't work, its too much

we return back up the call stack, we pop the last `2`

we call `dfs(1, [2,2,2], 6)`

we add `3` to the currentRes array, and we call `dfs(1, [2,2,2,3], 9)`

wont work, too much, we return back up the call stack

we return back up the call stack, we pop the last `3`

we call `dfs(2, [2,2,2], 6)`

we add `7` to the currentRes array, and we call `dfs(2, [2,2,2,7], 13)`

too much, we return back up the call stack, we pop the last `7`

we return back up the call stack, we pop the last `7`

we call `dfs(3, [2,2,2], 6)`

this is out of bounds, we return back up the call stack

this is where it gets exciting

now we pop the last `2`

if i show the function with some comments to explain where we're at

```js
function dfs(i, currentRes, totalSum) {
  if (totalSum === target) {
    res.push(currentRes.slice());
    return;
  }

  if (i === candidates.length || totalSum > target) {
    return;
  }

  currentRes.push(candidates[i]);

  // now in the new one, we called with this index as 2
  // so we add 7 to it
  // this was too much, so we return back up the call stack
  dfs(i, currentRes, totalSum + candidates[i]);

  // we pop the last 7
  currentRes.pop();

  // PREVIOUS: in the previous one
  // PREVIOUS: we popped 3 and moved forward to 7

  // now for 7, we popped it and tried to move forward
  // index 3 is out of bounds
  // we only have 3 candidates
  // so we return back up
  dfs(i + 1, currentRes, totalSum);
}
```

if we return back up from 7, where are we now?

this is the exciting bit

```js
function dfs(i, currentRes, totalSum) {
  if (totalSum === target) {
    res.push(currentRes.slice());
    return;
  }

  if (i === candidates.length || totalSum > target) {
    return;
  }

  currentRes.push(candidates[i]);

  dfs(i, currentRes, totalSum + candidates[i]);

  // here, we'll continue
  // because we already popped like oyu saw in the last snippet
  // we popped and then we returned back up becuase out of bounds
  // we have [2, 2, 2] here
  // and the index is still 0
  currentRes.pop();

  // now its [2, 2]
  // and index is 1
  // dfs(1, [2, 2], 4)
  dfs(i + 1, currentRes, totalSum);

  // the exciting bit here is that we'll just exhaust and do the same pattern over again
  // this time, 3 will be in index 2 and we'll start with [2,2,3]
}
```
