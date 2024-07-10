const m = 26; // length of alphabet
const groupLength = 5;

const gcd = function (a, b) {
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
};

const iscoprime = function (a, b) {
  return gcd(a, b) === 1;
};

const isalpha = function (ch) {
  return (ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z');
};

const createEncoder = function (a, b) {
  return function (plaintext) {
    if (!isalpha(plaintext)) return plaintext;
    const min = 'a'.charCodeAt(0);
    const index = plaintext.toLowerCase().charCodeAt(0) - min;
    const encodedLetterIndex = (a * index + b) % m;
    return String.fromCharCode(encodedLetterIndex + min);
  };
};

const modInverse = function (a) {
  a = a % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
};

const createDecoder = function (a, b) {
  return function (ciphertext) {
    if (!isalpha(ciphertext)) return ciphertext;
    const min = 'a'.charCodeAt(0);
    const index = ciphertext.charCodeAt(0) - min;
    const mmi = modInverse(a);
    const decodedIndex = (((mmi * (index - b)) % m) + m) % m;
    return String.fromCharCode(decodedIndex + min);
  };
};

const parseInputString = function (str) {
  return str.replace(/\W/g, '');
};

export const encode = function (phrase, key) {
  const { a, b } = key;
  if (!iscoprime(a, m)) throw new Error('a and m must be coprime.');
  const plaintext = parseInputString(phrase);
  const encoder = createEncoder(a, b);
  const ciphertext = [];
  for (let i = 0; i < plaintext.length; i += groupLength) {
    const chunk = plaintext.slice(i, i + groupLength);
    const encodedChunk = chunk.split('').map(encoder).join('');
    ciphertext.push(encodedChunk);
  }
  return ciphertext.join(' ');
};

export const decode = function (phrase, key) {
  const { a, b } = key;
  if (!iscoprime(a, m)) throw new Error('a and m must be coprime.');
  const plaintext = [];
  const decoder = createDecoder(a, b);
  for (const chunk of phrase.split(' ')) {
    const decodedChunk = chunk.split('').map(decoder).join('');
    plaintext.push(decodedChunk);
  }
  return plaintext.join('');
};
