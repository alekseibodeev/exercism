const BOOK_COST = 800;
const DISCOUNT = {
  1: 1.0,
  2: 0.95,
  3: 0.9,
  4: 0.8,
  5: 0.75,
};
const N = 5;
export const cost = (books) => {
  if (!books.length) return 0;
  const frequency = Array(N).fill(0);
  for (const book of books) {
    const i = book - 1;
    frequency[i]++;
  }
  frequency.sort((a, b) => b - a).filter((f) => f > 0);
  const backtrack = (frequency, current) => {
    if (!frequency.length) return current;
    let result = Number.MAX_SAFE_INTEGER;
    let count = 0;
    for (let i = 0; i < N; i++) {
      count++;
      frequency[i]--;
      const nextFrequency = frequency.filter((f) => f > 0);
      const check = current + count * BOOK_COST * DISCOUNT[count];
      result = Math.min(result, backtrack(nextFrequency, check));
    }
    return result;
  };
  return backtrack(frequency, 0);
};
