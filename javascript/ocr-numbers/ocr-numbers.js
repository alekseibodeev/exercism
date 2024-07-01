const M = 4;
const N = 3;
const numbers = {
  '010101111': '0',
  '000001001': '1',
  '010011110': '2',
  '010011011': '3',
  '000111001': '4',
  '010110011': '5',
  '010110111': '6',
  '010001001': '7',
  '010111111': '8',
  '010111011': '9',
};

/**
 *
 * @param {string} grid
 * @return {string}
 */
export const convert = (grid) => {
  const lines = grid.split('\n');
  const binaries = [];
  for (let line = 0; line < lines.length; line++) {
    const i = line % M;
    if (i === 0) binaries.push(Array(lines[line].length / N).fill(''));
    if (i === 3) continue;
    const currentBinaryLine = binaries[binaries.length - 1];
    for (let j = 0; j < lines[line].length; j++) {
      const k = Math.floor(j / N);
      currentBinaryLine[k] += lines[line][j] === ' ' ? '0' : '1';
    }
  }
  return binaries
    .map((line) => line.map((binary) => numbers[binary] || '?').join(''))
    .join(',');
};
