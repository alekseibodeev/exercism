export class List {
  /**
   * @param {number[]} arr
   */
  constructor(arr = []) {
    this.list = arr;
  }

  /**
   * @param {List} that
   * @returns {'EQUAL'|'SUBLIST'|'SUPERLIST'|'UNEQUAL'}
   */
  compare(that) {
    const a = this.list.join();
    const b = that.list.join();
    if (a === b) return 'EQUAL';
    if (b.includes(a)) return 'SUBLIST';
    if (a.includes(b)) return 'SUPERLIST';
    return 'UNEQUAL';
  }
}
