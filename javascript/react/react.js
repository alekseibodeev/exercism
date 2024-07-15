const resolveDependencies = function (cells, uniques = new Set()) {
  cells.forEach((cell) =>
    cell instanceof InputCell
      ? uniques.add(cell)
      : resolveDependencies(cell.dependencies, uniques)
  );
  return uniques;
};

export class InputCell {
  constructor(value) {
    this.value = value;
    this.observers = [];
  }

  subscribe(cell) {
    this.observers.push(cell);
  }

  unsubscribe(cell) {
    this.observers = this.observers.filter((observer) => observer !== cell);
  }

  notify() {
    this.observers.forEach((observer) => observer.update());
  }

  setValue(value) {
    if (this.value === value) return;
    this.value = value;
    this.notify();
  }
}

export class ComputeCell {
  constructor(dependencies, fn) {
    resolveDependencies(dependencies).forEach((cell) => cell.subscribe(this));
    this.dependencies = dependencies;
    this.fn = fn;
    this.value = fn(dependencies);
    this.callbacks = [];
  }

  addCallback(cb) {
    this.callbacks.push(cb);
  }

  removeCallback(cb) {
    this.callbacks = this.callbacks.filter((callback) => callback !== cb);
  }

  update() {
    const oldValue = this.value;
    this.value = this.fn(this.dependencies);
    if (oldValue === this.value) return;
    this.callbacks.forEach((cb) => cb.update(this));
  }
}

export class CallbackCell {
  constructor(fn) {
    this.fn = fn;
    this.values = [];
  }

  update(value) {
    this.values.push(this.fn(value));
  }
}
