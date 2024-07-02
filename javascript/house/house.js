const firstLineStart = 'This is ';

const lineStart = [
  'that belonged to ',
  'that kept ',
  'that woke ',
  'that married ',
  'that kissed ',
  'that milked ',
  'that tossed ',
  'that worried ',
  'that killed ',
  'that ate ',
  'that lay in ',
];

const lineEnd = [
  'the horse and the hound and the horn',
  'the farmer sowing his corn',
  'the rooster that crowed in the morn',
  'the priest all shaven and shorn',
  'the man all tattered and torn',
  'the maiden all forlorn',
  'the cow with the crumpled horn',
  'the dog',
  'the cat',
  'the rat',
  'the malt',
  'the house that Jack built.',
];

export class House {
  /**
   * @param {number} n
   * @returns {string[]}
   */
  static verse(n) {
    /**
     * @type {string[]}
     */
    const result = [];
    const m = n - 1;
    const starts = lineStart.slice(-m);
    const ends = lineEnd.slice(-m);
    result.push(firstLineStart + lineEnd[lineEnd.length - n]);
    for (let i = 0; i < m; i++) {
      result.push(starts[i] + ends[i]);
    }
    return result;
  }

  /**
   * @param {number} startVerse
   * @param {number} endVerse
   * @returns {string[]}
   */
  static verses(startVerse, endVerse) {
    /**
     * @type {string}
     */
    const result = [];
    for (let i = startVerse; i <= endVerse; i++) {
      result.push(...this.verse(i));
      if (i < endVerse) result.push('');
    }
    return result;
  }
}
