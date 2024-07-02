const ANIMAL = {
  1: 'fly',
  2: 'spider',
  3: 'bird',
  4: 'cat',
  5: 'dog',
  6: 'goat',
  7: 'cow',
  8: 'horse',
};

const LINE = {
  2: 'It wriggled and jiggled and tickled inside her.',
  3: 'How absurd to swallow a bird!',
  4: 'Imagine that, to swallow a cat!',
  5: 'What a hog, to swallow a dog!',
  6: 'Just opened her throat and swallowed a goat!',
  7: "I don't know how she swallowed a cow!",
};

export class Song {
  /**
   * @param {number} n
   * @returns {string}
   */
  verse(n) {
    const lines = [];
    lines.push(`I know an old lady who swallowed a ${ANIMAL[n]}.\n`);
    if (n > 1 && n < 8) lines.push(`${LINE[n]}\n`);
    for (let i = n - 1; i > 0; i--) {
      if (n === 8) break;
      lines.push(
        `She swallowed the ${ANIMAL[i + 1]} to catch the ${ANIMAL[i]}${i === 2 ? ` ${LINE[i].replace('It', 'that')}` : '.'}\n`
      );
    }
    if (n < 8) {
      lines.push(
        `I don't know why she swallowed the fly. Perhaps she'll die.\n`
      );
    } else {
      lines.push(`She's dead, of course!\n`);
    }
    return lines.join('');
  }

  /**
   * @param {number} start
   * @param {number} end
   * @returns {string}
   */
  verses(start, end) {
    const res = [];
    for (let i = start; i <= end; i++) {
      res.push(this.verse(i));
    }
    res.push('');
    return res.join('\n');
  }
}
