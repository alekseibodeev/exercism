export const isArmstrongNumber = function (num) {
  const digits = String(num).split('');
  const power = digits.length;
  return digits.reduce((acc, val) => acc + Number(val) ** power, 0) === num;
};
