export class BinarySearchTree {
  #data;
  /**
   * @type {BinarySearchTree | null}
   */
  #left;
  /**
   * @type {BinarySearchTree | null}
   */
  #right;

  /**
   * @param {number} data
   */
  constructor(data) {
    this.#data = data;
    this.#left = null;
    this.#right = null;
  }

  get data() {
    return this.#data;
  }

  get right() {
    return this.#right;
  }

  get left() {
    return this.#left;
  }

  /**
   * @param {BinarySearchTree} node
   */
  set right(node) {
    this.#right = node;
  }

  /**
   * @param {BinarySearchTree} node
   */
  set left(node) {
    this.#left = node;
  }

  /**
   * @param {number} data
   */
  insert(data) {
    let curr = this;
    let prev = null;
    while (curr) {
      prev = curr;
      if (data > curr.data) {
        curr = curr.right;
      } else {
        curr = curr.left;
      }
    }
    if (data > prev.data) {
      prev.right = new BinarySearchTree(data);
    } else {
      prev.left = new BinarySearchTree(data);
    }
  }

  /**
   * @param {(data: number) => any} cb
   */
  each(cb) {
    if (this.left) this.left.each(cb);
    cb(this.data);
    if (this.right) this.right.each(cb);
  }
}
