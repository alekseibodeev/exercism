export const score = function (x, y) {
  const distanceFromCenter = Math.hypot(x, y);
  if (distanceFromCenter > 10) return 0;
  if (distanceFromCenter > 5) return 1;
  if (distanceFromCenter > 1) return 5;
  return 10;
};
