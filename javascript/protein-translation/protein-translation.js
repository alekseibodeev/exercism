const PROTEIN = [
  'Methionine',
  'Phenylalanine',
  'Leucine',
  'Serine',
  'Tyrosine',
  'Cysteine',
  'Tryptophan',
];

const CODON = {
  AUG: 0,
  UUU: 1,
  UUC: 1,
  UUA: 2,
  UUG: 2,
  UCU: 3,
  UCC: 3,
  UCA: 3,
  UCG: 3,
  UAU: 4,
  UAC: 4,
  UGU: 5,
  UGC: 5,
  UGG: 6,
  UAA: -1,
  UAG: -1,
  UGA: -1,
};

const CODON_LENGTH = 3;

export const translate = function (sequence = '') {
  const proteins = [];

  for (let i = 0; i < sequence.length; i += CODON_LENGTH) {
    const codon = sequence.slice(i, i + CODON_LENGTH);
    const proteinIndex = CODON[codon];
    if (proteinIndex === undefined) {
      throw new Error('Invalid codon');
    } else if (proteinIndex === -1) {
      break;
    } else {
      const protein = PROTEIN[proteinIndex];
      proteins.push(protein);
    }
  }

  return proteins;
};
