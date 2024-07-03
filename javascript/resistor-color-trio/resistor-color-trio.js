const COLORS = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
};

export class ResistorColorTrio {
  constructor(colors) {
    if (colors.some((color) => COLORS[color] === undefined)) {
      throw new Error(/invalid color/);
    }
    const [a, b, c] = colors.map((color) => COLORS[color]);
    this.value = (a * 10 + b) * 10 ** c;
    if (this.value % 1000) {
      this.unit = 'ohms';
    } else {
      this.value /= 1000;
      this.unit = 'kiloohms';
    }
  }

  get label() {
    return `Resistor value: ${this.value} ${this.unit}`;
  }
}
