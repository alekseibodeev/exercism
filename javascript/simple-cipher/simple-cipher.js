const RANDOM_KEY_LENGTH = 100;
const N = 26;

export class Cipher {
  #key;

  constructor(key) {
    this.#key = key || this.#generateKey();
  }

  #generateKey() {
    const key = Array(RANDOM_KEY_LENGTH);
    for (let i = 0; i < RANDOM_KEY_LENGTH; i++) {
      key[i] = this.#generateLowercaseLetter();
    }
    return key.join('');
  }

  #generateLowercaseLetter() {
    return String.fromCharCode(
      Math.floor(Math.random() * N) + 'a'.charCodeAt(0)
    );
  }

  encode(str) {
    const encodedStr = str.split('');
    for (let i = 0; i < encodedStr.length; i++) {
      const keyIndex = i % this.#key.length;
      const keyCode = this.#key.charCodeAt(keyIndex) - 'a'.charCodeAt(0);
      const code = encodedStr[i].charCodeAt(0) - 'a'.charCodeAt(0);
      const encodedCode = (code + keyCode) % N;
      encodedStr[i] = String.fromCharCode(encodedCode + 'a'.charCodeAt(0));
    }
    return encodedStr.join('');
  }

  decode(str) {
    const decodedStr = str.split('');
    for (let i = 0; i < decodedStr.length; i++) {
      const keyIndex = i % this.#key.length;
      const keyCode = this.#key.charCodeAt(keyIndex) - 'a'.charCodeAt(0);
      const code = decodedStr[i].charCodeAt(0) - 'a'.charCodeAt(0);
      const decodedCode = (N + code - keyCode) % N;
      decodedStr[i] = String.fromCharCode(decodedCode + 'a'.charCodeAt(0));
    }
    return decodedStr.join('');
  }

  get key() {
    return this.#key;
  }
}
