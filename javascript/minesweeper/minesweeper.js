export const annotate = function (input) {
  if (!input.length) return [];

  const board = input.map((r) => r.split(''));
  const m = board.length;
  const n = board[0].length;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] !== '*') continue;

      const neighbors = [
        [r + 1, c],
        [r - 1, c],
        [r, c + 1],
        [r, c - 1],
        [r + 1, c + 1],
        [r + 1, c - 1],
        [r - 1, c + 1],
        [r - 1, c - 1],
      ];

      for (const [r_nei, c_nei] of neighbors) {
        if (Math.min(r_nei, c_nei) < 0 || r_nei >= m || c_nei >= n) continue;
        if (board[r_nei][c_nei] === '*') continue;
        if (board[r_nei][c_nei] === ' ') board[r_nei][c_nei] = 0;
        board[r_nei][c_nei]++;
      }
    }
  }

  return board.map((r) => r.join(''));
};
