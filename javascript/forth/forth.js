/**
 * @param {(a: number, b: number) => number} fn
 * @returns {(stack: number[]) => () => void}
 */
const arithmetic = (fn) => (stack) => () => {
  if (stack.length < 2) throw new Error('Stack empty');
  const b = stack.pop();
  const a = stack.pop();
  stack.push(fn(a, b));
};

const add = arithmetic((a, b) => a + b);
const subtract = arithmetic((a, b) => a - b);
const multiply = arithmetic((a, b) => a * b);
const divide = arithmetic((a, b) => {
  if (b === 0) throw new Error('Division by zero');
  return Math.trunc(a / b);
});

/**
 * @param {number[]} stack
 * @returns {() => void}
 */
const dup = (stack) => () => {
  if (stack.length === 0) throw new Error('Stack empty');
  stack.push(stack[stack.length - 1]);
};

/**
 * @param {number[]} stack
 * @returns {() => void}
 */
const drop = (stack) => () => {
  if (stack.length === 0) throw new Error('Stack empty');
  stack.pop();
};

/**
 * @param {number[]} stack
 * @returns {() => void}
 */
const swap = (stack) => () => {
  if (stack.length < 2) throw new Error('Stack empty');
  const a = stack.pop();
  const b = stack.pop();
  stack.push(a);
  stack.push(b);
};

/**
 * @param {number[]} stack
 * @returns {() => void}
 */
const over = (stack) => () => {
  if (stack.length < 2) throw new Error('Stack empty');
  stack.push(stack[stack.length - 2]);
};

export class Forth {
  /**
   * @type {number[]}
   */
  #memory;
  /**
   * @type {Map<string, () => void>}
   */
  #defaultCommands;

  /**
   * @type {Map<string, string>}
   */
  #userCommands;

  constructor() {
    this.#memory = [];
    this.#defaultCommands = new Map([
      ['+', add(this.#memory)],
      ['-', subtract(this.#memory)],
      ['*', multiply(this.#memory)],
      ['/', divide(this.#memory)],
      ['DUP', dup(this.#memory)],
      ['DROP', drop(this.#memory)],
      ['SWAP', swap(this.#memory)],
      ['OVER', over(this.#memory)],
    ]);
    this.#userCommands = new Map();
  }

  /**
   * @param {string} expression
   */
  evaluate(expression) {
    if (this.#isCustomDefinition(expression)) {
      this.#parseCustomDefinition(expression);
      return;
    }

    expression = this.#parseExpression(expression);

    for (const symb of expression) {
      if (this.#defaultCommands.has(symb)) {
        this.#defaultCommands.get(symb)();
      } else if (!Number.isNaN(parseInt(symb))) {
        this.#memory.push(parseInt(symb));
      } else {
        throw new Error('Unknown command');
      }
    }
  }

  get stack() {
    return this.#memory;
  }

  /**
   * @param {string} expression
   * @returns {boolean}
   */
  #isCustomDefinition(expression) {
    if (!expression.startsWith(':')) return false;
    if (!expression.endsWith(';')) return false;
    return true;
  }
  /**
   * @param {string} expression
   */
  #parseCustomDefinition(expression) {
    const [name, ...commands] = expression
      .slice(2, -2)
      .toUpperCase()
      .split(' ');

    if (!Number.isNaN(parseInt(name))) throw new Error('Invalid definition');

    for (let i = 0; i < commands.length; i++) {
      while (this.#userCommands.has(commands[i])) {
        commands[i] = this.#userCommands.get(commands[i]);
      }
    }
    this.#userCommands.set(name, commands.join(' '));
  }

  /**
   * @param {string} expression
   * @returns {string[]}
   */
  #parseExpression(expression) {
    const res = expression.toUpperCase().split(' ');
    for (let i = 0; i < res.length; i++) {
      if (this.#userCommands.has(res[i])) {
        res[i] = this.#userCommands.get(res[i]).split(' ');
      }
    }
    return res.flat();
  }
}
