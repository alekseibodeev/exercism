const N = 26;

export const isPangram = (str) => {
  const letters = Array(N).fill(0);
  for (const char of str) {
    const i = char.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
    if (i >= 0 && i < 26) letters[i] = 1;
  }
  const count = letters.reduce((acc, ltr) => acc + ltr);
  return count === N;
};
