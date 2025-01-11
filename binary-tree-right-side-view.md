# Binary Tree Right Side View

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
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (!root) return [];

  let res = [];
  let queue = [root];

  while (queue.length) {
    let length = queue.length;
    let rightMostNode = null;

    for (let i = 0; i < length; i++) {
      let node = queue.shift();
      rightMostNode = node;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    res.push(rightMostNode.val);
  }

  return res;
};
```

if you've not seen the first bfs question, go through that one

essentially we know that we're pushing left in first if it exists

because we're getting the first element with .shift

we know that as long as for each level, we keep assignign the latter node to the rightmostnode, we'll keep going right since we always push the right node AFTER the left node
