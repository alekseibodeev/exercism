export const eggCount = (displayValue) => {
  let count = 0;
  while (displayValue) {
    if (displayValue & 1) count++;
    displayValue >>= 1;
  }
  return count;
};
