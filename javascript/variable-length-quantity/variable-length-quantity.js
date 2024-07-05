const BYTE_SIZE = 8;
const GROUP_SIZE = BYTE_SIZE - 1;

/**
 * @param {number[]} nums
 * @returns {number[]}
 */
export function encode(nums) {
  /**
   * @type {number[]}
   */
  const res = [];
  for (const num of nums) {
    const bin = num.toString(2).split('');
    const groups = [];
    while (bin.length) {
      const buffer = [];
      for (let i = 0; i < GROUP_SIZE; i++) {
        buffer.push(bin.pop() || '0');
      }
      if (groups.length) {
        buffer.push('1');
      } else {
        buffer.push('0');
      }
      const group = parseInt(buffer.reverse().join(''), 2);
      groups.push(group);
    }
    res.push(...groups.reverse());
  }
  return res;
}

/**
 * @param {number[]} nums
 * @returns {number[]}
 */
export function decode(nums) {
  /**
   * @type {number[]}
   */
  const res = [];
  let buffer = [];
  for (const num of nums) {
    let bin = num.toString(2);
    if (bin.length < BYTE_SIZE) {
      buffer.push('0'.repeat(GROUP_SIZE - bin.length) + bin);
      res.push(parseInt(buffer.join(''), 2));
      buffer = [];
    } else {
      buffer.push(bin.slice(1));
    }
  }
  if (buffer.length) throw new Error('Incomplete sequence');
  return res;
}
