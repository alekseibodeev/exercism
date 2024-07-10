const normalize = function (str) {
  return str.replace(/\W/g, '').toLowerCase();
};

export class Crypto {
  constructor(phrase) {
    this.plaintext = normalize(phrase);
  }

  get ciphertext() {
    const { plaintext } = this;
    const rowLength = Math.ceil(Math.sqrt(plaintext.length));
    const ciphertext = [];
    const rect = [];
    for (let i = 0; i < plaintext.length; i += rowLength) {
      const chunk = plaintext.slice(i, i + rowLength);
      const delta = rowLength - chunk.length;
      rect.push(chunk.concat(' '.repeat(delta)));
    }
    for (let col = 0; col < rowLength; col++) {
      const chunk = [];
      for (let row = 0; row < rect.length; row++) {
        chunk.push(rect[row][col]);
      }
      ciphertext.push(chunk.join(''));
    }
    return ciphertext.join(' ');
  }
}
