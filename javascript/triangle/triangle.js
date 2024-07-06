export class Triangle {
  #isTriangle;
  #isEquilateral;
  #isIsosceles;
  #isScalene;

  constructor(...sides) {
    this.a = sides[0];
    this.b = sides[1];
    this.c = sides[2];

    const hasZeroes = !(this.a && this.b && this.c);
    if (
      !hasZeroes &&
      this.a + this.b >= this.c &&
      this.a + this.c >= this.b &&
      this.b + this.c >= this.a
    ) {
      this.#isTriangle = true;
    } else {
      this.#isTriangle = false;
    }

    if (this.#isTriangle && this.a === this.b && this.b === this.c) {
      this.#isEquilateral = true;
    } else {
      this.#isEquilateral = false;
    }

    if (
      this.#isTriangle &&
      (this.a === this.b || this.a === this.c || this.b === this.c)
    ) {
      this.#isIsosceles = true;
    } else {
      this.#isIsosceles = false;
    }

    if (this.#isTriangle && !this.#isEquilateral && !this.#isIsosceles) {
      this.#isScalene = true;
    } else {
      this.#isScalene = false;
    }
  }

  get isEquilateral() {
    return this.#isEquilateral;
  }

  get isIsosceles() {
    return this.#isIsosceles;
  }

  get isScalene() {
    return this.#isScalene;
  }
}
