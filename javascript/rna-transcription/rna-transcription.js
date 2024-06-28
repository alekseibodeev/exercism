const COMPLEMENTS = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export const toRna = (dna) => {
  const n = dna.length;
  const rna = Array(n);
  for (let i = 0; i < n; i++) {
    rna[i] = COMPLEMENTS[dna[i]];
  }
  return rna.join('');
};
