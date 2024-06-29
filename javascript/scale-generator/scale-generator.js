const FLAT_SIGNATURE = new Set([
  'F',
  'Bb',
  'Eb',
  'Ab',
  'Db',
  'Gb',
  'd',
  'g',
  'c',
  'f',
  'bb',
  'eb',
]);

const SCALES = {
  flat: ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'],
  sharp: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
};

export class Scale {
  constructor(tonic) {
    this.scale = FLAT_SIGNATURE.has(tonic) ? 'flat' : 'sharp';
    this.tonic = tonic[0].toUpperCase() + (tonic[1] || '');
  }

  chromatic() {
    const scale = SCALES[this.scale];
    const i = scale.indexOf(this.tonic);
    return scale.slice(i).concat(scale.slice(0, i));
  }

  interval(intervals) {
    const scale = SCALES[this.scale];
    let i = scale.indexOf(this.tonic);
    const res = [scale[i]];
    for (const step of intervals) {
      if (step === 'M') {
        i += 2;
      } else if (step === 'm') {
        i += 1;
      } else {
        i += 3;
      }
      i %= scale.length;
      res.push(scale[i]);
    }
    return res;
  }
}
