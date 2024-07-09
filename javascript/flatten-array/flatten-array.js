/**
 * @param {any[]} arr
 * @returns {any[]}
 */
export const flatten = function (arr) {
  const res = [];

  for (const item of arr) {
    if (item === null) continue;
    if (Array.isArray(item)) {
      res.push(...flatten(item));
    } else {
      res.push(item);
    }
  }

  return res;
};
