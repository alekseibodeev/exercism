const countToWords = {
  10: 'Ten',
  9: 'Nine',
  8: 'Eight',
  7: 'Seven',
  6: 'Six',
  5: 'Five',
  4: 'Four',
  3: 'Three',
  2: 'Two',
  1: 'One',
  0: 'No',
};

const formatBottles = (count) => (count !== 1 ? 'bottles' : 'bottle');
const createFirstLine = (count) =>
  `${countToWords[count]} green ${formatBottles(count)} hanging on the wall,`;
const createMidLine = () => 'And if one green bottle should accidentally fall,';
const createLastLine = (count) =>
  `There'll be ${countToWords[count].toLowerCase()} green ${formatBottles(count)} hanging on the wall.`;

export const recite = (initialBottlesCount, takeDownCount) => {
  const song = [];
  for (let i = 0, count = initialBottlesCount; i < takeDownCount; i++) {
    song.push(createFirstLine(count));
    song.push(createFirstLine(count));
    song.push(createMidLine());
    song.push(createLastLine(--count));
    song.push('');
  }
  song.pop();
  return song;
};
