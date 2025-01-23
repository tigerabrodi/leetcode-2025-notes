```js
class Node {
  constructor(key = null, val = null, prev = null, next = null) {
    this.key = key;
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.length = 0;
  this.cache = {};

  this.left = new Node();
  this.right = new Node();

  this.left.next = this.right;
  this.right.prev = this.left;
};

LRUCache.prototype.insert = function (node) {
  let prevRight = this.right.prev;
  this.right.prev = node;
  node.next = this.right;
  node.prev = prevRight;

  prevRight.next = node;
};

LRUCache.prototype.remove = function (node) {
  let prev = node.prev;
  let next = node.next;

  prev.next = next;
  next.prev = prev;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  let node = this.cache[key];
  if (node !== undefined) {
    this.remove(node);
    this.insert(node);
    return node.val;
  }

  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.cache[key] !== undefined) {
    let node = this.cache[key];
    this.remove(node);
    this.insert(node);
    node.val = value;
  } else {
    if (this.length === this.capacity) {
      let lru = this.left.next;
      this.remove(lru);
      delete this.cache[lru.key];
      this.length--;
    }

    let newNode = new Node(key, value);
    this.insert(newNode);
    this.cache[key] = newNode;
    this.length++;
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```

the trick here is to have both the cache for o of 1 lookup and the linked list for o of 1 insertion and deletion

doubly linked list is there to keep track of the order of the nodes

the good part is we only need to know the least and most recent node, so we can remove and insert in o of 1 time

the ones in the middle we dont need to knwo their order

the back one is the important one due to eviction

we have a remove and insert helper since theyre used in multiple places

the key here is understanding that getting and updating also causes the node to move to the front

that is why we have the remove and insert helpers, theyre useful and used a lot

its not too hard if u wrap your head around the entire thing
