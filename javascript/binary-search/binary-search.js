/**
 * @param {number[]} nums
 * @param {number} target
 */
export const find = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    const middle = Math.floor((start + end) / 2);
    if (nums[middle] === target) return middle;
    if (nums[middle] > target) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }
  throw new Error('Value not in array');
};
