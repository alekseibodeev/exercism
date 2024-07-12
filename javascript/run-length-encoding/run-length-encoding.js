export const encode = function (inputString) {
  const stack = []; // store tuples [count, character]
  for (const currentCharacter of inputString) {
    if (!stack.length) {
      stack.push([1, currentCharacter]);
      continue;
    }

    const [count, previousCharacter] = stack.pop();
    if (previousCharacter === currentCharacter) {
      stack.push([count + 1, currentCharacter]);
    } else {
      stack.push([count, previousCharacter]);
      stack.push([1, currentCharacter]);
    }
  }

  return stack.reduce((a, v) => a + (v[0] === 1 ? v[1] : v[0] + v[1]), '');
};

export const decode = function (inputString) {
  const stack = []; // store tuples [count, character]
  for (let i = 0, j = 0; j < inputString.length; j++) {
    const currentCharacter = inputString[j];
    if (currentCharacter >= '0' && currentCharacter <= '9') continue;
    const count = Number(inputString.slice(i, j)) || 1;
    stack.push([count, currentCharacter]);
    i = j + 1;
  }

  return stack.reduce((a, v) => a + v[1].repeat(v[0]), '');
};
