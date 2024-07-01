/**
 *
 * @param {string[]} diagram
 * @returns {number}
 */
export function count(diagram) {
  const intervals = new Map();
  let counter = 0;
  for (const row of diagram) {
    for (let i = 0; i < row.length; i++) {
      if (row[i] === '-') continue;
      for (let j = i + 1; j < row.length; j++) {
        if (row[i] === '+' && row[j] !== '-' && row[j] !== '+') break;
        const interval = JSON.stringify([i, j]);
        if (row[i] === '+' && row[j] === '+') {
          const occurrences = intervals.get(interval) || 0;
          counter += occurrences;
          intervals.set(interval, occurrences + 1);
        } else if (
          intervals.has(interval) &&
          (!'+|'.includes(row[i]) || !'+|'.includes(row[j]))
        ) {
          intervals.delete(interval);
        }
      }
    }
  }
  return counter;
}
