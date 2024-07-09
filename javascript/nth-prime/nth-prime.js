/**
 * @param {number} num
 * @returns {boolean}
 */
const isPrime = function (num) {
  if (num === 2 || num === 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
};

/**
 * @param {number} n
 * @returns {number}
 */
export const prime = function (n) {
  if (n === 0) throw new Error('there is no zeroth prime');
  let num = 2;
  while (n) {
    if (isPrime(num)) n--;
    num++;
  }

  return --num;
};
