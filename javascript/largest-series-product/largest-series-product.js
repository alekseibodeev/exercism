/**
 *
 * @param {string} digits
 * @param {number} span
 * @returns {number}
 */
export const largestProduct = (digits, span) => {
  if (digits.length < span) {
    throw new Error('Span must be smaller than string length');
  }

  if (span < 0) {
    throw new Error('Span must be greater than zero');
  }

  let maxProduct = 0;
  let product = 1;
  for (let start = 0, end = 0; end < digits.length; end++) {
    if (digits[end] < '0' || digits[end] > '9') {
      throw new Error('Digits input must only contain digits');
    }

    if (digits[end] === '0') {
      start = end + 1;
      product = 1;
      continue;
    }

    product *= parseInt(digits[end]);
    if (end - start + 1 === span) {
      maxProduct = Math.max(maxProduct, product);
      product /= parseInt(digits[start++]);
    }
  }
  return maxProduct;
};
