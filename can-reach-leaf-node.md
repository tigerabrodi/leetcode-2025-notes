```js
// Leaf node without encountering0
function canReachLeaf(root) {
  // If we encounter zero or null e.g. if root.left from parent is null
  // return false from this path
  if (!root || root.val === 0) return false;

  // if not zero and it exists, check if it's a leaf
  // if it is, wohoo, we found a leaf
  if (!root.left && !root.right) return true;

  // Try going down the left path first
  if (canReachLeaf(root.left)) return true;

  // If we can't find a leaf on the left, try the right path
  // The interesting part here is that we'll try the right path if root.left returned false
  // So we won't just immediately return false all the way back up
  if (canReachLeaf(root.right)) return true;

  // we return false all the way back up from a node only if
  // we've tried both left and right paths of a root and they both returned false
  return false;
}
```

```
       4
      / \
     2   6
    /     \
   1       0
```

```js
canReachLeaf(4)  // Start at root (4)
// 4 != 0 and root exists, continue
// Node has children so not a leaf
└── Try left: canReachLeaf(2)  // Check left subtree
    // 2 != 0 and node exists, continue
    // Has left child (1), not a leaf
    └── Try left: canReachLeaf(1)  // Check left child
        // 1 != 0 and node exists, continue
        // No children - this is a leaf!
        └── return True  // Found valid leaf!
    └── return True  // Propagate True up
└── return True  // Final result True

// Note: Right subtree (6->0) never explored
// because we found valid path on left!
```

```js
canReachLeaf(6)
// 6 != 0 and exists, continue
// Has right child (0), not a leaf
└── Try right: canReachLeaf(0)
    // val == 0, immediately return False
└── Try left: no left child
└── return False  // No valid path found
```
