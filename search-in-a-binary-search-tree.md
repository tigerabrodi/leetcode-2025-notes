# Search a BST

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
var searchBST = function (root, val) {
  if (!root) return root;

  if (val > root.val) {
    return searchBST(root.right, val);
  } else if (val < root.val) {
    return searchBST(root.left, val);
  } else {
    return root;
  }
};
```

this gotta be one of my favorite stuff

i love recursion and trees

now i wanna be clear about the base case if you were thinking about it

yes, we could just return null there, root would be null since root.right or root.left which we called with would be null

---

lets go over an example, since recursion is such a beautiful thing

```
     4
   /   \
  2     7
 / \   / \
1   3 6   8
```

if we were looking for 7:

```js
searchBST(4, 7)  // Start at root (4)
// 7 > 4, so go right
└── return searchBST(7, 7)  // At node 7
    // 7 === 7, so return this node
    └── return node 7 and its subtree (7->6,8)
// Parent (4) gets this result and returns it up
```

the interesting thing here is that if we dont find the value

we immediatly return

this means when we bubble up

each return is just gonna be the one we returned from the bottom, which is either null or the node we found

---

another example, looking for 9 which doesnt exist:

```js
searchBST(4, 9)  // Start at root (4)
// 9 > 4, so go right
└── return searchBST(7, 9)  // At node 7
    // 9 > 7, so go right
    └── return searchBST(8, 9)  // At node 8
        // 9 > 8, so go right
        └── return searchBST(null, 9)  // Hit null!
            // Base case: return null
            └── return null
        // Parent (8) returns null
    // Parent (7) returns null
// Parent (4) returns null
```

here we just keep going right until we hit null and return null

becaue we're always returning everytime we go down the chain, every value will return null back up the chain
