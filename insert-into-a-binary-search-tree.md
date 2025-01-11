# Insert into a BST

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
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  if (!root) return new TreeNode(val);

  if (val > root.val) {
    root.right = insertIntoBST(root.right, val);
  } else if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  }

  return root;
};
```

this one is exciting, recursion, my jam

so we need to eventually hit "null" in the right spot

if root exists, we need to check whether we're going down the right or left side

once we hit null, we'll create a new node and return it back up the chain to who ever called us with root.right or root.left

in the end we need to return root

the reason for this is because the parent up the chain will need the subtree returned, so that it has the right subtree

```
     4
   /   \
  2     6
 / \     \
1   3     7
```

lets say we gotta insert 5

```js
insertIntoBST(4, 5)  // Start at root (4)
// 5 > 4, so go right
└── root.right = insertIntoBST(6, 5)  // At node 6
    // 5 < 6, so go left
    └── root.left = insertIntoBST(null, 5)  // Hit null!
        // Base case: return new TreeNode(5)
        └── return Node(5)
    // 6's left pointer gets Node(5)
    // Returns node 6 with new left child
└── 4's right pointer gets updated 6
// Finally return root (4)
```
