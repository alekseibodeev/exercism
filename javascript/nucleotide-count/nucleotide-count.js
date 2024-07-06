/**
 * @param {string} strand
 * @returns {number}
 */
export function countNucleotides(strand) {
  const counts = new Map([
    ['A', 0],
    ['C', 0],
    ['G', 0],
    ['T', 0],
  ]);
  for (const nucleo of strand) {
    if (!counts.has(nucleo)) throw new Error('Invalid nucleotide in strand');
    counts.set(nucleo, counts.get(nucleo) + 1);
  }
  return [...counts.values()].join(' ');
}
