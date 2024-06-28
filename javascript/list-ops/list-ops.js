export class List {
  constructor(values = []) {
    this.values = values;
  }

  append(that) {
    this.values = [...this.values, ...that.values];
    return this;
  }

  concat(those) {
    for (const that of those.values) {
      this.append(that);
    }
    return this;
  }

  filter(cb) {
    const res = new List();
    for (const val of this.values) {
      if (cb(val)) {
        res.append(new List([val]));
      }
    }
    return res;
  }

  map(cb) {
    const res = new List(this.values);
    const n = res.length();
    for (let i = 0; i < n; i++) {
      res.values[i] = cb(res.values[i]);
    }
    return res;
  }

  length() {
    let res = 0;
    for (const _ of this.values) {
      res++;
    }
    return res;
  }

  foldl(cb, acc) {
    const n = this.length();
    for (let i = 0; i < n; i++) {
      acc = cb(acc, this.values[i]);
    }
    return acc;
  }

  foldr(cb, acc) {
    const n = this.length();
    for (let i = n - 1; i >= 0; i--) {
      acc = cb(acc, this.values[i]);
    }
    return acc;
  }

  reverse() {
    const res = new List();
    const n = this.length();
    for (let i = n - 1; i >= 0; i--) {
      res.append(new List([this.values[i]]));
    }
    return res;
  }
}
