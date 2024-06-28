export class GradeSchool {
  #roster;
  #draft;
  constructor() {
    this.#roster = new Map();
    this.#draft = new Map();
  }

  roster() {
    const schoolRoster = {};
    for (const [studentGrade, studentNames] of this.#roster) {
      schoolRoster[studentGrade] = [...studentNames];
    }
    return schoolRoster;
  }

  add(studentName, studentGrade) {
    if (this.#draft.has(studentName)) {
      const currentGrade = this.#draft.get(studentName);
      const students = this.#roster.get(currentGrade);
      const i = students.indexOf(studentName);
      students.splice(i, 1);
    }
    this.#draft.set(studentName, studentGrade);
    if (!this.#roster.has(studentGrade)) this.#roster.set(studentGrade, []);
    const students = this.#roster.get(studentGrade);
    students.push(studentName);
    students.sort();
  }

  grade(studentGrade) {
    return [...(this.#roster.get(studentGrade) || [])];
  }
}
