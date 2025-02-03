// This solution brings time complexity  to O(n) and space complexity up to O(n)
export const twoSum = (nums: number[], target: number) => {

  // What do we know?
  // nums[currentIndex] + y = target
  
  // What don't we know?
  // y

  // How to find y? Swap sides to find complement! (transpose)
  // y = target - nums[currentIndex]

  // Given that we know what number `y` is, we can then
  // check to see if we have seen a `y` in the list as
  // we iterate over it.

  const f = (nums: number[], target: number, currentIndex: number, seenNums: Map<number, number> | undefined) => {
    const  map = seenNums || new Map<number, number>();
    const complement = target - nums[currentIndex]

    if (map.has(complement)) {
      return [map.get(complement), currentIndex ]
    } else {
      // Remember the current value and it's index.
      map.set(nums[currentIndex], currentIndex)

      // If there is more list..
      if (currentIndex < nums.length) {
        return f(nums, target, currentIndex + 1, map);
      }
      else {
        return []
      }
    }
  }

  return f(nums, target, 0, undefined);

};
