/**
 * @param {string} a
 * @param {string} b
 * @returns {string}
 */
const createLine = (a, b) => `For want of a ${a} the ${b} was lost.`;

/**
 * @param {string} a
 * @returns {string}
 */
const createFinalLine = (a) => `And all for the want of a ${a}.`;

/**
 * @param  {...string} list
 * @returns {string}
 */
export const proverb = (...list) => {
  if (!list.length) return '';
  const lines = [];
  for (let i = 1; i < list.length; i++) {
    if (typeof list[i] === 'object') break;
    lines.push(createLine(list[i - 1], list[i]));
  }

  if (typeof list[list.length - 1] === 'object') {
    lines.push(
      createFinalLine(list[list.length - 1].qualifier + ' ' + list[0])
    );
  } else {
    lines.push(createFinalLine(list[0]));
  }

  return lines.join('\n');
};
