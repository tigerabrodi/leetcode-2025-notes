# Subsets

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  let res = [];
  let subset = [];

  function dfs(i) {
    if (i >= nums.length) {
      res.push(subset.slice());
      return;
    }

    subset.push(nums[i]);
    dfs(i + 1);

    subset.pop();
    dfs(i + 1);
  }

  dfs(0);
  return res;
};
```

this one is really tricky

we wanna know all the possible subsets of an array

before we go over the entire thing

i think it'd be great to understand two things

the first one i that we need to do .slice because we're modifying the subset array throughout the dfs function calls, .slice copies the subset array with a new reference, this way we don't modify what we pushed to the res array

the second one is that we're going down on path at a time, we don't do things concurrently

two examples help clarify this

lets look at the first one

```js
// What we need:
res.push(subset.slice())  // RIGHT! Pushes a new copy

// Example with [1,2]:
dfs(0):
    subset = [1]
    dfs(1):
        subset = [1,2]
        res.push(subset.slice())  // Pushes new [1,2] array
        subset.pop()              // Back to [1]
        res.push(subset.slice())  // Pushes new [1] array
    subset.pop()                  // Back to []
    // And so on...
```

here we keep adding to the subset array as we go down till index is greater than or equal to nums.length, which means there are no more nums to access

we add to the res array a new copy of the subset array

then we pop the last element from the subset array

when we do it again, because in the newcall i will be greater than or equal to nums.length, we push a new copy of the subset array to the res array, which this time will be without the last element

so we called dfs 0, we added 1 to the subset arr

then we called dfs 1, we added 2 to the subset arr

we then called dfs 2, this is the lenght of arr, so we push a new copy of the subset arr to the res array, then return

return just returns undefined, but this isnt relevant, the point here is that we're stopping the recursion and going back up to continue the function in the parent

we popped the 2 which was at index 1

we then call dfs 2 again, this time we popped, so only [1] remains in the subset arr, and we still call it with the same index like the first time we icnremented

this is because we wanna know the variations of the subsets

---

```js
let nums = [1,2,3,4];
let subset = [];

// First deep dive including everything:
dfs(0):  // First call with 1
    subset.push(1)       // subset = [1]
    dfs(1)              // Dive deeper with 2
        subset.push(2)   // subset = [1,2]
        dfs(2)          // Dive deeper with 3
            subset.push(3)   // subset = [1,2,3]
            dfs(3)          // Dive deeper with 4
                subset.push(4)   // subset = [1,2,3,4]
                dfs(4)          // i >= length!
                    // Push copy of [1,2,3,4] to result
                    return
                subset.pop()     // Remove 4, subset = [1,2,3]
                dfs(4)          // Try without 4
                    // Push copy of [1,2,3] to result
                    return
            subset.pop()     // Remove 3, subset = [1,2]
            // Now we'll try paths without 3...
```

this is a bigger example, which clearly demonstrates the dfs function going deep into the first path
