export const rows = (n) => {
  if (n === 0) return [];
  if (n === 1) return [[1]];
  const res = [[1]];
  for (let i = 1; i < n; i++) {
    const prev = res[res.length - 1];
    const curr = [];
    for (let j = 0; j < i + 1; j++) {
      const left = prev[j - 1] || 0;
      const right = prev[j] || 0;
      curr.push(left + right);
    }
    res.push(curr);
  }
  return res;
};
