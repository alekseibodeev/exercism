const DEFAULT_STUDENTS = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Fred',
  'Ginny',
  'Harriet',
  'Ileana',
  'Joseph',
  'Kincaid',
  'Larry',
];

const PLANT_CODES = {
  G: 'grass',
  V: 'violets',
  R: 'radishes',
  C: 'clover',
};

const PLANTS_PER_ROW = 2;

export class Garden {
  constructor(diagram, students = DEFAULT_STUDENTS) {
    this.students = Object.fromEntries(students.sort().map((s, i) => [s, i]));
    this.rows = diagram.split('\n');
  }

  plants(student) {
    const studentIndex = this.students[student];
    const startingPoint = studentIndex * PLANTS_PER_ROW;
    const plants = [];
    for (const row of this.rows) {
      const chunk = row.slice(startingPoint, startingPoint + PLANTS_PER_ROW);
      for (const code of chunk) {
        plants.push(PLANT_CODES[code]);
      }
    }
    return plants;
  }
}
