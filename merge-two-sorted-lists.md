# Merging Two Sorted Lists

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let dummy = new ListNode();
  let tail = dummy;

  // only while both lists have nodes
  // a list is a node with a value and a pointer to the next node
  while (list1 && list2) {
    // if list1 is greater than list2, we want to add list2 to the tail
    if (list1.val > list2.val) {
      // new node for the merged list
      tail.next = list2;
      // move list2 pointer forward
      list2 = list2.next;
    } else {
      // new node for the merged list
      tail.next = list1;
      // move list1 pointer forward
      list1 = list1.next;
    }

    // this is safe to do
    // we're just moving the tail pointer forward to the node we just added
    tail = tail.next;
  }

  // if list1 has nodes left
  // means exited loop because list2 is null
  if (list1) {
    tail.next = list1;
  }

  // if list2 has nodes left
  // means exited loop because list1 is null
  if (list2) {
    tail.next = list2;
  }

  return dummy.next;
};
```

this one is actually easy for the most part

the tricky part here is how on earth does dummy.next return the head?

let's focus on this for a while

when you do tail = dummy, you're telling tail to point to the same memory address as dummy

that's why when you do tail.next, you are actually modifying the dummy.next, they share the same memory address

```js
let dummy = new ListNode(); // Create a new node in memory, let's say at address X
let tail = dummy; // tail now points to the SAME memory address X
```

```js
// Let's say we're adding value 2
tail.next = list2; // This modifies the "next" pointer at memory address X
tail = tail.next; // tail now points to a new memory address (list2's address)
```

what happens on the surface is you telling tail and dummy what to point to, under the hood is where the real stuff is stored

---
