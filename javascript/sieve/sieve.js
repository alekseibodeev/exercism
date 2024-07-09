/**
 * @param {number} n
 * @returns {number[]}
 */
export const primes = function (n) {
  let prime = Array.from({ length: n - 1 }, (_, i) => i + 2);
  for (let i = 0; i < prime.length; i++) {
    if (prime[i] === -1) continue;
    for (let j = prime[i] * prime[i] - 2; j < prime.length; j += prime[i]) {
      if (prime[j] % prime[i] === 0) prime[j] = -1;
    }
  }
  return prime.filter((val) => val !== -1);
};
