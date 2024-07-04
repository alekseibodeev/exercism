export class Element {
  /**
   * @param {number} value
   * @param {Element | null} next
   */
  constructor(value = 0, next = null) {
    this.value = value;
    this.next = next;
  }
}

export class List {
  /**
   * @type {Element | null}
   */
  #head;
  #length;
  /**
   * @param {number[]} values
   */
  constructor(values = []) {
    this.#head = values.reduce((prev, curr) => new Element(curr, prev), null);
    this.#length = values.length;
  }

  /**
   * @param {Element} nextValue
   */
  add(nextValue) {
    nextValue.next = this.#head;
    this.#head = nextValue;
    this.#length++;
  }

  get length() {
    return this.#length;
  }

  get head() {
    return this.#head;
  }

  toArray() {
    const arr = [];
    for (let node = this.#head; node; node = node.next) {
      arr.push(node.value);
    }
    return arr;
  }

  /**
   * @returns {List}
   */
  reverse() {
    let prev = null;
    let curr = this.#head;
    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.#head = prev;
    return this;
  }
}
