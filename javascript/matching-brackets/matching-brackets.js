class Stack {
  #stack;
  constructor() {
    this.#stack = [];
  }

  peek() {
    return this.#stack[this.#stack.length - 1];
  }

  pop() {
    return this.#stack.pop();
  }

  push(val) {
    return this.#stack.push(val);
  }

  isEmpty() {
    return this.#stack.length === 0;
  }
}

/**
 * @param {string} char
 * @returns {boolean}
 */
const isBracket = (char) => '[]{}()'.includes(char);
/**
 * @param {string} char
 * @returns {boolean}
 */
const isOpenBracket = (char) => '[{('.includes(char);
/**
 * @param {string} char1
 * @param {string} char2
 * @returns {boolean}
 */
const isMatch = (char1, char2) => '[]{}()'.includes(char1 + char2);

/**
 * @param {string} str
 * @returns {boolean}
 */
export const isPaired = (str) => {
  const stack = new Stack();
  for (const char of str) {
    if (!isBracket(char)) continue;
    if (isOpenBracket(char)) {
      stack.push(char);
    } else if (!stack.isEmpty() && isMatch(stack.peek(), char)) {
      stack.pop();
    } else {
      return false;
    }
  }
  return stack.isEmpty();
};
