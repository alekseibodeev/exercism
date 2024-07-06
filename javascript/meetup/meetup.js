const WEEKS = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  last: Infinity,
  teenth: Infinity,
};

const DAYS = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

/**
 * @param {number} year
 * @param {number} month
 * @param {'first'|'second'|'third'|'fourth'|'last'|'teenth'} week
 * @param {'Sunday'|'Monday'|'Tuesday'|'Wednesday'|'Thursday'|'Friday'|'Saturday'} day
 * @returns
 */
export const meetup = (year, month, week, day) => {
  const date = new Date(year, month - 1);
  let i = WEEKS[week];
  while (date.getDay() !== DAYS[day]) {
    date.setDate(date.getDate() + 1);
  }
  while (date.getMonth() === month - 1) {
    i--;
    if (i === 0) return date;
    if (week === 'teenth' && date.getDate() > 12) return date;
    date.setDate(date.getDate() + 7);
  }
  date.setDate(date.getDate() - 7);
  return date;
};
