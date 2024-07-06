/**
 * @param {number} num
 * @returns {'deficient'|'abundant'|'perfect'}
 */
export const classify = (num) => {
  if (num < 1) {
    throw new Error('Classification is only possible for natural numbers.');
  }
  let aliquotSum = 0;
  for (let i = 1; i <= num / 2; i++) {
    if (num % i === 0) aliquotSum += i;
  }
  if (aliquotSum < num) return 'deficient';
  if (aliquotSum > num) return 'abundant';
  return 'perfect';
};
