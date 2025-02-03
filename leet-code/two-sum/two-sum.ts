const sumsToT = (t: number) => (x: number, y: number) => x + y == t;

export const twoSum = (nums: number[], target: number) => {
  const sumsToTarget = sumsToT(target);

  const findSums = (nums: number[], target: number, startIndex: number) => {
    const head = nums[startIndex];
    let tail = [...nums].slice(startIndex + 1);
    const foundIndex = tail.findIndex((n: number) => sumsToTarget(head, n));

    if (foundIndex !== -1) {
      return [startIndex, startIndex + foundIndex + 1];
    } else if (tail.length >= 2) {
      return findSums(nums, target, startIndex + 1);
    } else {
      return [];
    }
  };

  return findSums(nums, target, 0);
};
