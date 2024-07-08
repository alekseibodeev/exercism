export class Palindromes {
  constructor(smallest, largest) {
    this.smallest = smallest;
    this.largest = largest;
  }

  static generate({ maxFactor, minFactor }) {
    if (minFactor > maxFactor) throw new Error('min must be <= max');
    const smallest = Palindromes.getSmallestPalindrome(maxFactor, minFactor);
    const largest = Palindromes.getLargestPalindrome(maxFactor, minFactor);
    const factorsOfSmallest = Palindromes.getFactors(
      smallest,
      maxFactor,
      minFactor
    );
    const factorsOfLargest = Palindromes.getFactors(
      largest,
      maxFactor,
      minFactor
    );
    return new Palindromes(
      new Palindrome(smallest, factorsOfSmallest),
      new Palindrome(largest, factorsOfLargest)
    );
  }

  static getSmallestPalindrome(maxFactor, minFactor) {
    let minProduct = null;
    for (let i = minFactor; i <= maxFactor; i++) {
      for (let j = i; j <= maxFactor; j++) {
        const product = i * j;
        if (minProduct && product > minProduct) break;
        if (Palindromes.check(product)) minProduct = product;
      }
    }
    return minProduct;
  }

  static getLargestPalindrome(maxFactor, minFactor) {
    let maxProduct = null;
    for (let i = maxFactor; i >= minFactor; i--) {
      for (let j = i; j >= minFactor; j--) {
        const product = i * j;
        if (maxProduct && product < maxProduct) break;
        if (Palindromes.check(product)) maxProduct = product;
      }
    }
    return maxProduct;
  }

  static check(num) {
    const str = num.toString();
    const rev = str.split('').reverse().join('');
    return str === rev;
  }

  static getFactors(num, maxFactor, minFactor) {
    if (num === null) return [];
    const factors = [];
    const used = new Set();
    for (let factor = minFactor; factor <= maxFactor; factor++) {
      if (used.has(factor)) break;
      if (num % factor) continue;
      const quotient = num / factor;
      if (quotient > maxFactor || quotient < minFactor) continue;
      used.add(quotient);
      factors.push([factor, quotient]);
    }
    return factors;
  }
}

class Palindrome {
  constructor(value, factors) {
    this.value = value;
    this.factors = factors;
  }
}
