export const abilityModifier = (score) => {
  if (score < 3) throw new Error('Ability scores must be at least 3');
  if (score > 18) throw new Error('Ability scores can be at most 18');
  return Math.floor((score - 10) / 2);
};

const NUMBER_OF_SIDES = 6;
const NUMBER_OF_DICES = 4;

const rollDice = () => Math.floor(Math.random() * NUMBER_OF_SIDES) + 1;

export class Character {
  #strength;
  #dexterity;
  #constitution;
  #intelligence;
  #wisdom;
  #charisma;
  #hitpoints;

  constructor() {
    this.#strength = Character.rollAbility();
    this.#dexterity = Character.rollAbility();
    this.#constitution = Character.rollAbility();
    this.#intelligence = Character.rollAbility();
    this.#wisdom = Character.rollAbility();
    this.#charisma = Character.rollAbility();
    this.#hitpoints = 10 + abilityModifier(this.#constitution);
  }

  static rollAbility() {
    const rolls = Array(NUMBER_OF_DICES)
      .fill(0)
      .map(() => rollDice());
    const indexOfMin = rolls.indexOf(Math.min(...rolls));
    return rolls
      .filter((_, i) => i !== indexOfMin)
      .reduce((sum, roll) => sum + roll);
  }

  get strength() {
    return this.#strength;
  }

  get dexterity() {
    return this.#dexterity;
  }

  get constitution() {
    return this.#constitution;
  }

  get intelligence() {
    return this.#intelligence;
  }

  get wisdom() {
    return this.#wisdom;
  }

  get charisma() {
    return this.#charisma;
  }

  get hitpoints() {
    return this.#hitpoints;
  }
}
