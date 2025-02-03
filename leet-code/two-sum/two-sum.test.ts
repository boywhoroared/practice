import { expect, test } from "vitest"
import { twoSum } from "./two-sum-map"

test.each([
  { nums: [2,7,11,15], result: [0,1], target: 9},
  { nums: [3,2,4], result:[1,2], target: 6},
  { nums: [3,3], result:[0,1], target: 6}
])('find two nums that add up to $target', ({ nums, result, target }) => {
  expect(twoSum(nums, target)).toEqual(result)

})
