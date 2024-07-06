export class BankAccount {
  #balance;
  #isOpen;
  constructor() {
    this.#balance = 0;
    this.#isOpen = false;
  }

  open() {
    if (this.#isOpen) throw new ValueError();
    this.#isOpen = true;
  }

  close() {
    if (!this.#isOpen) throw new ValueError();
    this.#balance = 0;
    this.#isOpen = false;
  }

  /**
   * @param {number} value
   */
  deposit(value) {
    if (!this.#isOpen || value <= 0) throw new ValueError();
    this.#balance += value;
  }

  /**
   * @param {number} value
   */
  withdraw(value) {
    if (!this.#isOpen || value <= 0 || value > this.#balance) {
      throw new ValueError();
    }
    this.#balance -= value;
  }

  get balance() {
    if (!this.#isOpen) throw new ValueError();
    return this.#balance;
  }
}

export class ValueError extends Error {
  constructor() {
    super('Bank account error');
  }
}
