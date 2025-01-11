# Design Linked List

```js
class Node {
  constructor(val = null, prev = null, next = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

var MyLinkedList = function () {
  this.dummyHead = new Node();
  this.dummyTail = new Node();

  this.dummyHead.next = this.dummyTail;
  this.dummyTail.prev = this.dummyHead;
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0) return -1;

  let curr = this.dummyHead.next;

  while (index > 0 && curr) {
    curr = curr.next;

    index--;
  }

  if (!curr || curr === this.dummyTail) return -1;

  return curr.val;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  let prevHead = this.dummyHead.next;

  let newNode = new Node(val);

  this.dummyHead.next = newNode;

  newNode.prev = this.dummyHead;
  newNode.next = prevHead;

  prevHead.prev = newNode;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  let prevTail = this.dummyTail.prev;

  let newNode = new Node(val);

  this.dummyTail.prev = newNode;

  newNode.next = this.dummyTail;
  newNode.prev = prevTail;

  prevTail.next = newNode;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index < 0) return;

  let curr = this.dummyHead.next;

  while (index > 0) {
    if (curr === this.dummyTail) return;

    curr = curr.next;
    index--;
  }

  let newNode = new Node(val);

  let prev = curr.prev;

  curr.prev = newNode;
  newNode.next = curr;
  newNode.prev = prev;
  prev.next = newNode;
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || this.dummyHead.next === this.dummyTail) return;

  let curr = this.dummyHead.next;

  while (index > 0) {
    if (curr === this.dummyTail) return;
    curr = curr.next;
    index--;
  }

  if (curr === this.dummyTail) return;

  let prev = curr.prev;
  let next = curr.next;

  prev.next = next;
  next.prev = prev;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
```

this is a big one

lets start with the first bit, why a dummy head and tail? this helps with edge cases such as adding at index 0 or deleting at index 0, otherwise we would have to check if the index is 0 and handle it differently, this way we can just use the same logic for all cases

---

get

```js
/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0) return -1;

  let curr = this.dummyHead.next;

  while (index > 0 && curr) {
    curr = curr.next;

    index--;
  }

  if (!curr || curr === this.dummyTail) return -1;

  return curr.val;
};
```

if index is less than 0, return -1, its invalid

we start at our real head which is dummy head's next, we can just keep iterating, we'll exit if we hit it or if curr is null

if we exit, we know that index being 0 will only happy if curr doesnt exist

if curr is null or is rqual to dummy tail, return -1, dummy tail means out of bounds

otherwise return curr.val

---

adding at head and tail

```js
/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  let prevHead = this.dummyHead.next;

  let newNode = new Node(val);

  this.dummyHead.next = newNode;

  newNode.prev = this.dummyHead;
  newNode.next = prevHead;

  prevHead.prev = newNode;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  let prevTail = this.dummyTail.prev;

  let newNode = new Node(val);

  this.dummyTail.prev = newNode;

  newNode.next = this.dummyTail;
  newNode.prev = prevTail;

  prevTail.next = newNode;
};
```

this is fairly straighforward, you just gotta make sure uve a pointer to the prev head or tail, then you can just update the pointers, otherwise you'd lose the reference to em both

---

add at index and delete at index

```js
/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index < 0) return;

  let curr = this.dummyHead.next;

  while (index > 0) {
    if (curr === this.dummyTail) return;

    curr = curr.next;
    index--;
  }

  let newNode = new Node(val);

  let prev = curr.prev;

  curr.prev = newNode;
  newNode.next = curr;
  newNode.prev = prev;
  prev.next = newNode;
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || this.dummyHead.next === this.dummyTail) return;

  let curr = this.dummyHead.next;

  while (index > 0) {
    if (curr === this.dummyTail) return;
    curr = curr.next;
    index--;
  }

  if (curr === this.dummyTail) return;

  let prev = curr.prev;
  let next = curr.next;

  prev.next = next;
  next.prev = prev;
};
```

these ones are a bit trickier

when we add, its fine if the index is on the dummy tail, it means we should add at the end, however, if we realize before moving to curr.next, that curr is already the dummy tail, we should return, because we already know it's gonna be out of bounds

after that we can just proceed as normal

for deleting, we know that if head is dummy tail, we have nothing, so we can just return right away

we can do the same check like adding, where if curr is dummy tail, we know it's out of bounds and we can return

however, it can still happen, that curr is dummy tail, this is something we check outside the while loop, if this is also the case, we return, there is nothing to delte

otherwise deletion is just taking prev and pointing it to next, and next and pointing it to prev, this effectively removes the node from the list
