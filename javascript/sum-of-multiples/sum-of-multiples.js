export const sum = function (items, level) {
  const multiples = new Set();
  let points = 0;

  for (const item of items) {
    if (item === 0) continue;
    for (let multiple = item; multiple < level; multiple += item) {
      multiples.add(multiple);
    }
  }

  for (const multiple of multiples) {
    points += multiple;
  }

  return points;
};
