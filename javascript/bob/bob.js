export const hey = (message) => {
  const messageWithNoSpaces = message.replace(/\s/g, '');
  if (!messageWithNoSpaces) return 'Fine. Be that way!';
  const isQuestion = messageWithNoSpaces.endsWith('?');
  const hasLetters = /[a-z]/gi.test(messageWithNoSpaces);
  const isYell =
    messageWithNoSpaces === messageWithNoSpaces.toUpperCase() && hasLetters;
  if (isYell && isQuestion) return "Calm down, I know what I'm doing!";
  if (isQuestion) return 'Sure.';
  if (isYell) return 'Whoa, chill out!';
  return 'Whatever.';
};
