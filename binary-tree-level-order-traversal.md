# Binary Tree Level Order Traversal

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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];

  let res = [];

  let queue = [root];

  while (queue.length) {
    let length = queue.length;
    let currentLevel = [];

    for (let i = 0; i < length; i++) {
      let node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    res.push(currentLevel);
  }

  return res;
};
```

haha

the famous bfs question that went viral on twitter because someone said 90% of people can't solve it

well, that might be true lol, also it is crazy that people forget how to write a simple for loop

bfs is interesting

now to be clear, the first check is there in case someone calls the function with null

the key to bfs is having a queue

this queue starts with the root node

we continue our loop while the queue is not empty

the trick tho is to keep adding to the queue, that's the interesting part, how it length is kept track of as its attached to queue

just as a PS, arrays are objects under the hood

for every level, we get a snapshot of the length, since this will change as we add to the queue

we loop through the length, and for each node, we add its value to the current level array

we also add its left and right children to the queue

queue and current level are different

current level is reset for every level

queue is the same, we just keep adding to it, causing the next level to be processed as the queue.length isn't empty yet

its important to add it node.left before node.right, because we want to process the left child first, since we're processing it by order, level by level
