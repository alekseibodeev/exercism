export const knapsack = function (maxWeight, items) {
  const helper = function (index, weight, value) {
    if (weight > maxWeight) return 0;
    if (index === items.length) return value;
    return Math.max(
      helper(
        index + 1,
        weight + items[index].weight,
        value + items[index].value
      ),
      helper(index + 1, weight, value)
    );
  };
  return helper(0, 0, 0);
};
