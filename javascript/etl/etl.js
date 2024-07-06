/**
 * @param {{[key:number]: string[]}} old
 * @returns {{[key:string]: number}}
 */
export const transform = (old) => {
  const result = {};
  for (const [point, letters] of Object.entries(old)) {
    const value = parseInt(point);
    for (const letter of letters) {
      const key = letter.toLowerCase();
      result[key] = value;
    }
  }
  return result;
};
