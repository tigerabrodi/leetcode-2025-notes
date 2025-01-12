```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const minQueue = new MinPriorityQueue();

  for (const num of nums) {
    minQueue.enqueue(num);
  }

  while (minQueue.size() > k) {
    minQueue.dequeue();
  }

  return minQueue.front().element;
};
```

this is the same as kth largest element in a stream

we wanna find kth largest

by using a min queue, we can easily remove smaller numbers and keep the bigger ones

which is exactly what we want

we make sure size is k

then we immediately have acccess to the kth largest element

in this case we add all nums and then dequeue

```js
// Example: Find 3rd largest in [4,8,5,10,3]
minHeap: [4, 8, 5, 10, 3]; // Add all nums
// we know dequeue 3 and 4
// so we're left with [5, 8, 10]
// so the 3rd largest is 5
```
