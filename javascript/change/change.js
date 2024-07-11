const init2DDP = function (m, n) {
  const dp = [];
  for (let i = 0; i < m; i++) {
    dp.push([]);
    for (let j = 0; j < n; j++) {
      dp[i].push([]);
    }
  }
  return dp;
};

const calculateChange = function (coins, target) {
  if (target < 0) throw new Error('Negative totals are not allowed.');
  const m = target + 1;
  const n = coins.length;
  const dp = init2DDP(m, n);
  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const coin = coins[j];
      if (coin === i) {
        dp[i][j] = [coin];
      } else if (coin > i) {
        const prev = dp[i][j - 1] || { length: Infinity };
        dp[i][j] = prev;
      } else {
        const prev1 = dp?.[i - coin][j] || { length: Infinity };
        const prev2 = dp[i][j - 1] || { length: Infinity };
        if (prev1.length + 1 < prev2.length) {
          dp[i][j] = prev1.concat(coin);
        } else {
          dp[i][j] = prev2;
        }
      }
    }
  }

  const change = dp[m - 1][n - 1];

  if (!Number.isFinite(change.length)) {
    const message = `The total ${target} cannot be represented in the given currency.`;
    throw new Error(message);
  }

  return change;
};

export class Change {
  calculate(coins, target) {
    return calculateChange(coins, target);
  }
}
