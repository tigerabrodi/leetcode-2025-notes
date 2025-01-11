# Kth Smallest Element in a BST

# Iterative approach

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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  let stack = [];
  let curr = root;
  let n = 0;

  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop();

    n += 1;

    if (n === k) return curr.val;

    curr = curr.right;
  }
};
```

to get the kth smallest, we need to traverse the with inorder traversal, so that we can process the nodes in ascending order, from smallest to largest

every time we process a node, we increment n, if its equal to k, we return the node's value

the iterative approach can be tricky to understand

we have a stack, curr starts at root, but tbh its not gonna be the root, we just need to be some value so that we can start the while loop, now another approach could be to have root be in stack as the initial value

which is kind of what's happening in the first while loop inside the main while loop where we push curr and keep going left until we hit null

the reason we keep going left is because we want to find the smallest node, so we need to go all the way left

when the going left loop is done, curr will be null, that's why it ends, so we get the latest value that existed from the stack

we process the node

and then we wanna go right the next time

if right exists, what we'll do in the next loop is push it to the stack, and then keep going left

this is how inorder traversal works, that's why it's always smallest to largest

if curr.right is null

we skill the loop where we push curr, we just pop from the stack and assign that to curr (which we always do)

this is gonna be the node that was the parent of the smallest node if the smallest node didn't have a right child

---

# Recursive approach

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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k, n = { count: 0 }) {
  if (!root) return null;

  const left = kthSmallest(root.left, k, n);

  if (left !== null) return left;

  n.count += 1;

  if (n.count === k) return root.val;

  return kthSmallest(root.right, k, n);
};
```

the recursive approach is really interesting

its easy if u understand recursion

if u dont, its gonna be hard

lets go through what happens here

first thing youll see we have count, we need to use an object here since we gotta keep track of the reference and modify it throughout the function calls
