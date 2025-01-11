# Construct Binary Tree from Preorder and Inorder Traversal

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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;

  let rootVal = preorder[0];
  let root = new TreeNode(rootVal);
  let mid = inorder.indexOf(rootVal);

  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));

  return root;
};
```

this one is really tricky

its about understanding the role of mid

well first we gotta understrand preorder and inorder

inorder goes from smallest to largest

preorder goes from root to left to right

the first one in preorder is the root always

here we create a node with the root value

we find the index of the root in inorder, this tells us how many nodes are on the left and right side of the root

with this index, we call it mid, with this one, we can know how many nodes are to the left of the root

when we recursively call it for the left side, on preorder, we gotta get everything from the next index, not the root since we already used it, to the mid index, we wanna include the mid index here

.slice is up to but not including, we wanna include it because the mid index is among the left side, for the inorder, we want everything up to the mid index, we dont wanna include it because its the root, but we know that everything up to it is on the left side

for the right one, we get everything from the mid index + 1

for preorder this is because everything from the mid index + 1 is on the right side

for inorder, we dont use mid because that'd include the root, so we get everything from the mid + 1 to get the right side
