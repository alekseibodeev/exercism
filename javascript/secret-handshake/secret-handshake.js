const ACTIONS = ['wink', 'double blink', 'close your eyes', 'jump'];

/**
 * @param {number} num
 * @returns {string[]}
 */
export const commands = (num) => {
  const actions = [];
  for (let i = 0; i < 4; i++) {
    if (num & 1) actions.push(ACTIONS[i]);
    num >>= 1;
  }
  return num & 1 ? actions.reverse() : actions;
};
