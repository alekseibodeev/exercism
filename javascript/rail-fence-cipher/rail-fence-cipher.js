export const encode = (plainText, numberOfRails) => {
  const rails = Array.from(Array(numberOfRails), () => []);
  let railIndex = 0;
  let writingDirection = true;

  for (const char of plainText) {
    rails[railIndex].push(char);
    if (writingDirection) {
      railIndex++;
    } else {
      railIndex--;
    }

    if (railIndex === 0 || railIndex === numberOfRails - 1) {
      writingDirection = !writingDirection;
    }
  }

  return rails.map((rail) => rail.join('')).join('');
};

export const decode = (cipherText, numberOfRails) => {
  const railLengths = Array(numberOfRails).fill(0);
  let railIndex = 0;
  let writingDirection = true;

  for (let i = 0; i < cipherText.length; i++) {
    railLengths[railIndex]++;
    if (writingDirection) {
      railIndex++;
    } else {
      railIndex--;
    }

    if (railIndex === 0 || railIndex === numberOfRails - 1) {
      writingDirection = !writingDirection;
    }
  }

  const rails = [];

  let textIndex = 0;

  for (let i = 0; i < numberOfRails; i++) {
    const textChunk = cipherText.slice(textIndex, textIndex + railLengths[i]);
    textIndex += railLengths[i];
    rails.push(textChunk.split('').reverse());
  }

  let res = '';

  railIndex = 0;
  writingDirection = true;

  for (let i = 0; i < cipherText.length; i++) {
    res += rails[railIndex].pop();
    if (writingDirection) {
      railIndex++;
    } else {
      railIndex--;
    }

    if (railIndex === 0 || railIndex === numberOfRails - 1) {
      writingDirection = !writingDirection;
    }
  }

  return res;
};
