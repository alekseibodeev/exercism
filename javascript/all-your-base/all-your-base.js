const log = (base, num) => Math.log(num) / Math.log(base);

const isValidInput = (digits, base) => {
  if (!digits.length) return false;

  let zeroesCount = 0;
  let hasNonZeroDigit = false;

  for (const digit of digits) {
    if (
      digit < 0 ||
      digit >= base ||
      (!hasNonZeroDigit && zeroesCount > 0 && digit !== 0)
    ) {
      return false;
    }

    if (!hasNonZeroDigit && digit === 0) zeroesCount++;
    if (digit !== 0) hasNonZeroDigit = true;
  }

  if (zeroesCount === digits.length && digits.length > 1) return false;

  return true;
};

export const convert = (digits, base, targetBase) => {
  if (base < 2) throw new Error('Wrong input base');
  if (targetBase < 2) throw new Error('Wrong output base');
  if (!isValidInput(digits, base)) throw new Error('Input has wrong format');
  if (digits.length === 1 && digits[0] === 0) return [0];

  const n = digits.length - 1;
  const targetDigits = [];
  let num = digits.reduce((acc, val, i) => acc + val * base ** (n - i), 0);
  let i = Math.floor(log(targetBase, num));

  while (i >= 0) {
    const positionNumber = targetBase ** i;
    const digit = Math.floor(num / positionNumber);
    targetDigits.push(digit);
    num %= positionNumber;
    i--;
  }

  return targetDigits;
};
