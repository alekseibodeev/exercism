const m = 26; // length of alphabet
const groupLength = 5;

const isalpha = function (ch) {
  return (ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z');
};

const parseInputString = function (str) {
  return str.replace(/\W/g, '');
};

const transpose = function (ch) {
  if (!isalpha(ch)) return ch;
  const aascii = 'a'.charCodeAt(0);
  const index = ch.toLowerCase().charCodeAt(0) - aascii;
  const encodedIndex = m - (index % m) - 1;
  return String.fromCharCode(encodedIndex + aascii);
};

export const encode = function (phrase) {
  const plaintext = parseInputString(phrase);
  const ciphertext = [];
  for (let i = 0; i < plaintext.length; i += groupLength) {
    const chunk = plaintext.slice(i, i + groupLength);
    const encodedChunk = chunk.split('').map(transpose).join('');
    ciphertext.push(encodedChunk);
  }
  return ciphertext.join(' ');
};

export const decode = function (phrase) {
  const plaintext = [];
  for (const chunk of phrase.split(' ')) {
    const decodedChunk = chunk.split('').map(transpose).join('');
    plaintext.push(decodedChunk);
  }
  return plaintext.join('');
};
