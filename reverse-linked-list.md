# Reverse Linked List

# Iterative approach

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null;
  let curr = head;

  while (curr) {
    // Store next node
    let next = curr.next;

    // Reverse the link
    // This is the key part of the algorithm
    curr.next = prev;

    // Move pointers forward
    prev = curr;
    curr = next;
  }

  // prev will be the new head
  // Curr after loop will be null
  return prev;
};
```

Here we create prev and curr pointers. We know that prev the first time is null because head doesn't have a previous node. But head will become the tail and we know that's gonna point to null.

We can keep going through the list till we reach the end. In the final iteration, next that curr gets assigned to will be null. Curr will be null. Prev will however point to the new head, which previously was the last node, the tail.

We need to store next in a temporary variable because we overwrite curr.next with prev. Otherwise we'd lose the reference to the next node.

# Recursive approach

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  function reverse(node) {
    if (!node || !node.next) return node;

    const reversed = reverse(node.next);

    node.next.next = node;
    node.next = null;

    return reversed;
  }

  return reverse(head);
};
```

This is the recursive approach. It looks confusing, but let's break it down with a clear example.

1 -> 2 -> 3 -> 4 -> 5

We'll keep calling reverse on the next node until we reach the final node. When we reach the final node, node.next is null, therefore we return it BACK up.

Back up is important here. When we return it back up, we'll be at 4's level, where node is 4 and reversed is 5. This is key to understanding the algorithm. Otherwise it's very confusing how node.next.next is not null.

node.next.next would the first time be 4.next.next = 4. Which is 4.5.next = 4. 5 is the tail. We tell 5 to point to 4, which came before 5. That's how we reverse the list.

node.next to null is just to break the link. Since 3 will do exactly the same thing. We're modifying this in place. Objects are passed by reference, so don't get that confused.

Finally, we return reversed. In the level of 3, we're waiting for `reverse(4)`. Because we're modifying in place, it's gonna return 5->4->null.

The beauty with recursion is that once we're at the end, we just keep going back up.
