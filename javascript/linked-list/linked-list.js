class ListNode {
  constructor(val, next, prev) {
    this.val = val || 0;
    this.next = next || null;
    this.prev = prev || null;
  }
}

export class LinkedList {
  #head;
  #tail;
  #count;

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#count = 0;
  }

  push(val) {
    if (!this.#head) {
      this.#head = new ListNode(val);
      this.#tail = this.#head;
    } else {
      this.#tail.next = new ListNode(val, null, this.#tail);
      this.#tail = this.#tail.next;
    }
    this.#count++;
  }

  pop() {
    if (!this.#count) return;
    const val = this.#tail.val;
    if (this.#head === this.#tail) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#tail.prev.next = this.#tail.next;
      this.#tail = this.#tail.prev;
    }
    this.#count--;
    return val;
  }

  shift() {
    if (!this.#count) return;
    const val = this.#head.val;
    if (this.#head === this.#tail) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#head.next.prev = this.#head.prev;
      this.#head = this.#head.next;
    }
    this.#count--;
    return val;
  }

  unshift(val) {
    if (!this.#head) {
      this.#head = new ListNode(val);
      this.#tail = this.#head;
    } else {
      this.#head.prev = new ListNode(val, this.#head);
      this.#head = this.#head.prev;
    }
    this.#count++;
  }

  delete(val) {
    for (let node = this.#head; node; node = node.next) {
      if (node.val !== val) continue;
      if (!node.prev) {
        this.shift();
        break;
      } else if (!node.next) {
        this.pop();
        break;
      } else {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        this.#count--;
        break;
      }
    }
  }

  count() {
    return this.#count;
  }
}
