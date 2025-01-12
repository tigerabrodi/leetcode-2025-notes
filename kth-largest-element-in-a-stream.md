```js
/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.minQueue = new MinPriorityQueue();
  this.k = k;
  for (const num of nums) {
    this.add(num);
  }
};

KthLargest.prototype.add = function (val) {
  this.minQueue.enqueue(val);

  while (this.minQueue.size() > this.k) {
    this.minQueue.dequeue();
  }

  return this.minQueue.front().element;
};
```

we wanna keep track of the kth largest element

this means everytime we add, we wanna return for the addition the kth largest element

the best thing is to use a min priority queue

it's gonna automatically sort the elements for us

when u add an element, u jutk eep dequeuing until the size is k, when size is k, you return the front

which is the kth largest element

"kth largest" means the smallest element in the top k elements

for example

if k is 3

we're looking for the 3rd largest element, not the largest, but the 3rd largest

so if we have [1,2,3,4,5]

the 3rd largest is 3, since third position

an example

```js
// Example: Find 3rd largest in [4,8,5,10,3]
minHeap: [4]; // Add 4
minHeap: [4, 8]; // Add 8
minHeap: [4, 5, 8]; // Add 5
minHeap: [5, 8, 10]; // Add 10, dequeue 4 (too small!)
minHeap: [5, 8, 10]; // Add 3, dequeue immediately (too small!)
```
