/**
 * @param {string} phrase
 * @returns {string}
 */
export const parse = (phrase) =>
  phrase
    .match(/[a-z]+('[a-z]+)?/gi)
    .map((word) => word[0].toUpperCase())
    .join('');
