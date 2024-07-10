export class InvalidInputError extends Error {
  constructor(message) {
    super();
    this.message = message || 'Invalid Input';
  }
}

const directions = ['north', 'east', 'south', 'west'];

const normalizeIndex = function (index) {
  return (directions.length + index) % directions.length;
};

export class Robot {
  constructor() {
    this.directionIndex = 0;
    this.coordinates = [0, 0];
  }

  get bearing() {
    return directions[this.directionIndex];
  }

  place({ x, y, direction }) {
    const index = directions.indexOf(direction);
    if (index === -1) throw new InvalidInputError();
    this.directionIndex = index;
    this.coordinates = [x, y];
  }

  evaluate(instructions) {
    for (const instruction of instructions) {
      switch (instruction) {
        case 'L':
          this.turnLeft();
          break;
        case 'R':
          this.turnRight();
          break;
        case 'A':
          this.moveForward();
          break;
        default:
          throw new InvalidInputError();
      }
    }
  }

  turnLeft() {
    this.directionIndex = normalizeIndex(this.directionIndex - 1);
  }

  turnRight() {
    this.directionIndex = normalizeIndex(this.directionIndex + 1);
  }

  moveForward() {
    const [x, y] = this.coordinates;
    switch (this.directionIndex) {
      case 0:
        this.coordinates = [x, y + 1];
        break;
      case 1:
        this.coordinates = [x + 1, y];
        break;
      case 2:
        this.coordinates = [x, y - 1];
        break;
      case 3:
        this.coordinates = [x - 1, y];
    }
  }
}
