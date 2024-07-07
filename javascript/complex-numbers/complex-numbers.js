export class ComplexNumber {
  #real;
  #imag;

  /**
   * @param {number} real
   * @param {number} imag
   */
  constructor(real, imag) {
    this.#real = real;
    this.#imag = imag;
  }

  get real() {
    return this.#real;
  }

  get imag() {
    return this.#imag;
  }

  /**
   * @param {ComplexNumber} that
   * @returns {ComplexNumber}
   */
  add(that) {
    const real = this.real + that.real;
    const imag = this.imag + that.imag;
    return new ComplexNumber(real, imag);
  }

  /**
   * @param {ComplexNumber} that
   * @returns {ComplexNumber}
   */
  sub(that) {
    const real = this.real - that.real;
    const imag = this.imag - that.imag;
    return new ComplexNumber(real, imag);
  }

  /**
   * @param {ComplexNumber} that
   * @returns {ComplexNumber}
   */
  div(that) {
    return this.mul(that.#reciprocal());
  }

  /**
   * @param {ComplexNumber} that
   * @returns {ComplexNumber}
   */
  mul(that) {
    const real = this.real * that.real - this.imag * that.imag;
    const imag = this.imag * that.real + this.real * that.imag;
    return new ComplexNumber(real, imag);
  }

  get abs() {
    return Math.sqrt(this.real ** 2 + this.imag ** 2);
  }

  get conj() {
    return new ComplexNumber(this.real, -1 * this.imag);
  }

  get exp() {
    const real = Math.exp(this.real) * Math.cos(this.imag);
    const imag = Math.exp(this.real) * Math.sin(this.imag);
    return new ComplexNumber(real, imag);
  }

  #reciprocal() {
    const denom = this.real ** 2 + this.imag ** 2;
    const real = this.real / denom;
    const imag = (-1 * this.imag) / denom;
    return new ComplexNumber(real, imag);
  }
}
