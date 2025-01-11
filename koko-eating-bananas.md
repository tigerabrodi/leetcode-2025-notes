# Koko Eating Bananas

```js
/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  let res = right;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    let hours = 0;

    for (let i = 0; i < piles.length; i++) {
      hours += Math.ceil(piles[i] / mid);
    }

    if (hours <= h) {
      res = Math.min(res, mid);
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return res;
};
```

this one is quite tricky till you really understand the problem

the problem is that we need to find the minimum speed that koko can eat all the bananas in h hours, she eats pile per pile, but koko only eats maximum one pile per hour

so we need to find the minimum speed that koko can eat all the bananas in h hours

because she eats maximum one pile per hour, the highest speed is the maximum pile size

1 is lowest because she gotta eat something lol

we're doing a binary search, where mid represents the speed

each time we check using Math.ceil(piles[i] / mid) to get the hours it takes to eat all the bananas at the current speed, the reason we need Math.ceil is because if we hit any decimals, it should be more than 1 hour, we only care about hours here

if hours is less than or equal to h, we know that we can reduce the speed, so we set right to mid - 1, and result to the minimum of result and mid, if res is still less than mid, we just stick to res being res, otherwise we update it to mid

in the end we return res

if that is not the case, we know that koko needs to eat more, so we set left to mid + 1, making sure to increase the speed
