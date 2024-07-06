/**
 * @param {string} match
 * @returns string
 */
const replacer = (match) => {
  switch (match) {
    case 'plus':
      return '+';
    case 'minus':
      return '-';
    case 'multiplied by':
      return '*';
    case 'divided by':
      return '/';
  }
};
const re = /plus|minus|multiplied by|divided by/g;
/**
 * @param {string} item
 * @returns {boolean}
 */
const isOperator = (item) => /^[+\-*/]$/.test(item);
/**
 * @param {string} item
 * @returns {boolean}
 */
const isOperand = (item) => /^\d+$|^-\d+$/.test(item);
/**
 * @param {number} operand1
 * @param {string} operator
 * @param {number} operand2
 * @returns {number}
 */
const evalExpression = (operand1, operator, operand2) => {
  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '*':
      return operand1 * operand2;
    case '/':
      return Math.trunc(operand1 / operand2);
  }
};
/**
 * @param {string} str
 * @returns {number}
 */
export const answer = (str) => {
  if (!str.startsWith('What is') || !str.endsWith('?')) {
    throw new Error('Unknown operation');
  }
  const expression = str.slice(8, -1).replace(re, replacer).split(' ');
  let operator = '+';
  let operand = 0;
  let isPrevOperator = true;
  for (let i = 0; i < expression.length; i++) {
    if (!expression[i]) throw new Error('Syntax error');
    if (isOperator(expression[i])) {
      if (isPrevOperator) throw new Error('Syntax error');
      operator = expression[i];
      isPrevOperator = !isPrevOperator;
    } else if (isOperand(expression[i])) {
      if (!isPrevOperator) throw new Error('Syntax error');
      operand = evalExpression(operand, operator, parseInt(expression[i]));
      isPrevOperator = !isPrevOperator;
    } else {
      throw new Error('Unknown operation');
    }
  }
  if (isPrevOperator) throw new Error('Syntax error');
  return operand;
};
