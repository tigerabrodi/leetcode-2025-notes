# Path Sum

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum, totalSum = 0) {
  if (!root) return false;

  totalSum += root.val;

  if (!root.left && !root.right) {
    if (targetSum === totalSum) {
      return true;
    }
  }

  if (hasPathSum(root.left, targetSum, totalSum)) return true;
  if (hasPathSum(root.right, targetSum, totalSum)) return true;

  return false;
};
```

here we use backtracking

its interesting tho because we only need to pass by value of totalSum

thats why we dont have to reduce it before returning false back up in the end

the goal is to find a path to leaf node that matches the targetSum

if a node exists, we process it, add it to totalSum

if its a leaf, we check if the totalSum matches the targetSum, if so, return true

if not

we wanna continue down the left path first, if it returns true, we return true, we know it'd only return true if it's a leaf and the totalSum matches the targetSum

if not, we try right

in the end, if we didnt find anything for this subtree, we return false

you can imagine hasPathSum with root.left waiting

and then it'd get false back up

then it knows ah ok, we'll try the right path, nothing in this subtree worked

```
       4
      / \
     2   6
    /     \
   1       0
```

```js
hasPathSum(4, 6, 0);
```

we keep going down the left path first

```js
hasPathSum(2, 6, 4);
```

after processing 2, we go down the left path again

```js
hasPathSum(1, 6, 6);
```

in here, we see that 1 is a leaf, so we check if the totalSum matches the targetSum

```js
6 === 6;
```

so we return true

if we were looking for 7, it would return false, and it'd return false all the way back up to 4

then we check 4.right, which is 6

```js
hasPathSum(6, 7, 4);
```

```js
hasPathSum(0, 7, 10);
```

here we see that 0 is a leaf, so we check if the totalSum matches the targetSum, it doesnt, we're at 10, so we return false

now before we return false, we'd check left and right of 0, they both return false

therefore we continue and return false all the way back up to 4
