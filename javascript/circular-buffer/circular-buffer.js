class CircularBuffer {
  /**
   * @type {any[]}
   */
  #buffer;
  #oldest;
  #current;
  #written;

  /**
   * @param {number} size
   */
  constructor(size) {
    this.#buffer = Array(size);
    this.#oldest = 0;
    this.#current = 0;
    this.#written = 0;
  }

  /**
   * @param {any} val
   * @returns {void}
   */
  write(val) {
    if (this.#written === this.#buffer.length) throw new BufferFullError();
    this.#buffer[this.#current++] = val;
    this.#current %= this.#buffer.length;
    this.#written++;
  }

  /**
   * @returns {any}
   */
  read() {
    if (this.#written === 0) throw new BufferEmptyError();
    const val = this.#buffer[this.#oldest++];
    this.#oldest %= this.#buffer.length;
    this.#written--;
    return val;
  }

  /**
   * @param {any} val
   * @returns {void}
   */
  forceWrite(val) {
    if (this.#written === this.#buffer.length) {
      this.#buffer[this.#oldest++] = val;
      this.#oldest %= this.#buffer.length;
    } else {
      this.write(val);
    }
  }

  clear() {
    this.#oldest = 0;
    this.#current = 0;
    this.#written = 0;
  }
}

export default CircularBuffer;

export class BufferFullError extends Error {
  constructor() {
    super();
    this.message = 'Buffer is full.';
  }
}

export class BufferEmptyError extends Error {
  constructor() {
    super();
    this.message = 'Buffer is empty.';
  }
}
