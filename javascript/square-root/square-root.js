const fraction = 0.000001;

const goodEnough = function (prev, curr) {
  return Math.abs(curr - prev) <= fraction;
};

const improve = function (guess, x) {
  return (guess + x / guess) / 2;
};

export const squareRoot = function (x) {
  let prev = 0;
  for (let guess = 1; !goodEnough(prev, guess); guess = improve(guess, x)) {
    prev = guess;
  }
  return Math.floor(prev);
};
