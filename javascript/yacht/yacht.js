const SIDES_COUNT = 6;

const count = (face) => (dices) =>
  dices.reduce(
    (acc, val) => {
      if (face) return val === face ? acc + 1 : acc;
      acc[val - 1]++;
      return acc;
    },
    face ? 0 : Array(SIDES_COUNT).fill(0)
  );

const countAll = count();
const scoreDice = (n) => (dices) => n * count(n)(dices);
const scoreFullHouse = (dices) => {
  const counts = countAll(dices);
  const pair = counts.indexOf(2) + 1;
  const triplet = counts.indexOf(3) + 1;
  return pair && triplet ? 2 * pair + 3 * triplet : 0;
};
const scoreFourOfAKind = (dices) => {
  const counts = countAll(dices);
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] >= 4) return (i + 1) * 4;
  }
  return 0;
};
const scoreLittleStraight = (dices) => {
  const counts = countAll(dices);
  return counts.slice(0, -1).every((n) => n === 1) ? 30 : 0;
};
const scoreBigStraight = (dices) => {
  const counts = countAll(dices);
  return counts.slice(1).every((n) => n === 1) ? 30 : 0;
};
const scoreChoice = (dices) => dices.reduce((acc, val) => acc + val);
const scoreYacht = (dices) => {
  const counts = countAll(dices);
  return counts.some((n) => n === 5) ? 50 : 0;
};

const rounds = new Map([
  ['ones', scoreDice(1)],
  ['twos', scoreDice(2)],
  ['threes', scoreDice(3)],
  ['fours', scoreDice(4)],
  ['fives', scoreDice(5)],
  ['sixes', scoreDice(6)],
  ['full house', scoreFullHouse],
  ['four of a kind', scoreFourOfAKind],
  ['little straight', scoreLittleStraight],
  ['big straight', scoreBigStraight],
  ['choice', scoreChoice],
  ['yacht', scoreYacht],
]);

export const score = (dices, round) => rounds.get(round)(dices);
