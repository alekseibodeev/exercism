const lyrics = [
  ['first', 'a Partridge in a Pear Tree'],
  ['second', 'two Turtle Doves'],
  ['third', 'three French Hens'],
  ['fourth', 'four Calling Birds'],
  ['fifth', 'five Gold Rings'],
  ['sixth', 'six Geese-a-Laying'],
  ['seventh', 'seven Swans-a-Swimming'],
  ['eighth', 'eight Maids-a-Milking'],
  ['ninth', 'nine Ladies Dancing'],
  ['tenth', 'ten Lords-a-Leaping'],
  ['eleventh', 'eleven Pipers Piping'],
  ['twelfth', 'twelve Drummers Drumming'],
];

/**
 * @param {string} day
 * @param {string} line
 * @returns {string}
 */
const createVerse = (day, line) => {
  return `On the ${day} day of Christmas my true love gave to me: ${line}.\n`;
};

/**
 * @param  {...number} verse
 * @returns {string}
 */
export const recite = (...verse) => {
  const startVerse = verse[0];
  const endVerse = verse[verse.length - 1];
  const verses = [];
  for (let i = startVerse; i <= endVerse; i++) {
    const [first, ...others] = lyrics.slice(0, i);
    if (!others.length) {
      verses.push(createVerse(...first));
      continue;
    }

    const lines = [];
    const day = others[others.length - 1][0];
    for (const [_, line] of others.reverse()) {
      lines.push(line);
    }
    lines.push('and ' + first[1]);
    verses.push(createVerse(day, lines.join(', ')));
  }
  return verses.join('\n');
};
