/**
 * @param {any[]} collection
 * @param {() => boolean} predicate
 * @returns {any[]}
 */
export const keep = function (collection, predicate) {
  const res = [];
  for (const item of collection) {
    if (predicate(item)) res.push(item);
  }
  return res;
};

/**
 * @param {any[]} collection
 * @param {() => boolean} predicate
 * @returns {any[]}
 */
export const discard = function (collection, predicate) {
  const res = [];
  for (const item of collection) {
    if (!predicate(item)) res.push(item);
  }
  return res;
};
