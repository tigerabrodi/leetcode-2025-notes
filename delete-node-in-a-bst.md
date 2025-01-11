# Delete Node in a BST

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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (!root) return null;

  if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    let minNode = findMinNode(root.right);

    root.val = minNode.val;

    root.right = deleteNode(root.right, minNode.val);
  }

  return root;
};

function findMinNode(node) {
  let curr = node;

  while (curr.left) {
    curr = curr.left;
  }

  return curr;
}
```

lets talk about deleting when we have a node with only one child

then its easy, we just return the child that exists

if no left, return right, if no right, return left

EVEN if the other one doesnt exist too, then its gonna be null anyways, so thats fine

if we hit a case where we dont find the node, we just return null

we always need to return the root in the end, so we return the new subtree back up the chain to the parent which is waiting on it via root.left or root.right

---

now lets talk about deleting a node with two children

the question is which one to replace it with?

we need the minimum from the right side

because that would be greater than everything on the left side, and less than everything on the right side, we need to maintain the bst property

then when done we delete the node we replaced it with, when we find it then, its gonna hit the case where it doesnt have a left child and we return the right child, if right child is null, thats fine, then its parent will just point to null which is correct as already covered
