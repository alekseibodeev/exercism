/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const gcd = function (a, b) {
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
};

export class Rational {
  /**
   * @param {number} numer
   * @param {number} denom
   */
  constructor(numer, denom) {
    if (denom === 0) throw new Error("Denominator can't be zero");
    this.numer = numer;
    this.denom = denom;
  }

  /**
   * @param {Rational} that
   * @returns {Rational}
   */
  add(that) {
    const numer = this.numer * that.denom + that.numer * this.denom;
    const denom = this.denom * that.denom;
    return new Rational(numer, denom).reduce();
  }

  /**
   * @param {Rational} that
   * @returns {Rational}
   */
  sub(that) {
    const numer = this.numer * that.denom - that.numer * this.denom;
    const denom = this.denom * that.denom;
    return new Rational(numer, denom).reduce();
  }

  /**
   * @param {Rational} that
   * @returns {Rational}
   */
  mul(that) {
    const numer = this.numer * that.numer;
    const denom = this.denom * that.denom;
    return new Rational(numer, denom).reduce();
  }

  /**
   * @param {Rational} that
   * @returns {Rational}
   */
  div(that) {
    const numer = this.numer * that.denom;
    const denom = that.numer * this.denom;
    return new Rational(numer, denom).reduce();
  }

  /**
   * @returns {Rational}
   */
  abs() {
    const numer = Math.abs(this.numer);
    const denom = Math.abs(this.denom);
    return new Rational(numer, denom);
  }

  /**
   * @param {number} n
   * @returns {Rational}
   */
  exprational(n) {
    const numer = n > 0 ? this.numer ** n : this.denom ** Math.abs(n);
    const denom = n > 0 ? this.denom ** n : this.numer ** Math.abs(n);
    return new Rational(numer, denom).reduce();
  }

  /**
   * @param {number} x
   * @returns {number}
   */
  expreal(x) {
    const base = x ** this.numer;
    const power = 1 / this.denom;
    return Math.fround(base ** power);
  }

  /**
   * @returns {Rational}
   */
  reduce() {
    const { numer, denom } = this;
    const divisor = numer !== 0 ? gcd(Math.abs(numer), Math.abs(denom)) : denom;
    const sign = numer === 0 || Math.sign(numer) === Math.sign(denom) ? 1 : -1;
    this.numer = sign * (Math.abs(numer) / divisor);
    this.denom = Math.abs(denom) / divisor;
    return this;
  }
}
