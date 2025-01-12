```js
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  const maxPriorityQueue = new MaxPriorityQueue();

  for (const stone of stones) {
    maxPriorityQueue.enqueue(stone);
  }

  while (maxPriorityQueue.size() > 1) {
    const firstStone = maxPriorityQueue.dequeue().element;
    const secondStone = maxPriorityQueue.dequeue().element;

    if (firstStone !== secondStone) {
      const result = firstStone - secondStone;
      maxPriorityQueue.enqueue(result);
    }
  }

  return maxPriorityQueue.isEmpty() ? 0 : maxPriorityQueue.front().element;
};
```

we wanna take thw two largest stones and smash them together

if they're not the same, we add the difference back to the queue

largest is the key here, max heap is perfect for this

we continue till we have one or no stones left

then we return the last stone or 0 if there are no stones left

```js
// Example: Last stone weight in [2,7,4,1,8,1]
// maxHeap: [8,7,4,2,1,1]; // Add all stones
// maxHeap: [4,2,1,1]; // Smash 8 and 7, add 1
// maxHeap: [2,1,1]; // Smash 4 and 2, add 2
// maxHeap: [1,1]; // Smash 2 and 1, add 1
// maxHeap: [1]; // Smash 1 and 1, no stones left
// Result: 1
```
