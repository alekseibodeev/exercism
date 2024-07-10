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

export class DiffieHellman {
  /**
   * @param {number} p
   * @param {number} g
   */
  constructor(p, g) {
    if (p === 0 || g === 0) {
      throw new Error("Public parameters can't be zero");
    }
    if (!isPrime(p) || !isPrime(g)) {
      throw new Error('Public parameters should be prime numbers');
    }
    this.privateKey = Math.floor(Math.random() * p) || 1;
    this.p = p;
    this.g = g;
  }

  /**
   * @param {number} privateKey
   * @returns {number}
   */
  getPublicKey(privateKey) {
    const { p, g } = this;
    if (privateKey < 0) {
      throw new Error("Private key can't be negative");
    }
    if (privateKey === 0) {
      throw new Error("Private key can't be zero");
    }
    if (privateKey === 1) {
      throw new Error("Private key can't be one");
    }
    if (privateKey >= p) {
      throw new Error("Private key can't be greater than modulus parameter");
    }
    return g ** privateKey % p;
  }

  /**
   * @param {number} theirPublicKey
   * @param {number} myPrivateKey
   * @returns {number}
   */
  getSecret(theirPublicKey, myPrivateKey) {
    const { p } = this;
    return theirPublicKey ** myPrivateKey % p;
  }
}
