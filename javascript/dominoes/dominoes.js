/**
 * @param {number[][]} dominoes
 * @returns {boolean}
 */
const canBuildCorrectChain = (dominoes) => {
  return dominoes.flat().reduce((acc, val) => acc ^ val, 0) === 0;
};

/**
 *
 * @param {number[][]} dominoes
 * @returns
 */
export const chain = (dominoes) => {
  if (!canBuildCorrectChain(dominoes)) return null;
  /**
   * @param {number[][]} current
   * @param {Set<number>} picked
   * @returns {number[][] | null}
   */
  const backtrack = (current, picked) => {
    if (current.length === dominoes.length) return current;
    const prev = current[current.length - 1];
    let res = null;
    for (let i = 0; i < dominoes.length; i++) {
      if (picked.has(i)) continue;
      if (!prev) {
        res = res || backtrack([dominoes[i]], picked.add(i));
      } else if (dominoes[i].includes(prev[1])) {
        const j = dominoes[i].indexOf(prev[1]);
        if (j === 0) {
          res = res || backtrack([...current, dominoes[i]], picked.add(i));
        } else {
          res =
            res ||
            backtrack([...current, dominoes[i].reverse()], picked.add(i));
        }
      }
      picked.delete(i);
    }
    return res;
  };
  return backtrack([], new Set());
};
