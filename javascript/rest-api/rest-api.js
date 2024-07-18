const parseUrl = function (url) {
  const urlObj = {};
  const [base, query] = url.split('?');
  urlObj.base = base;
  if (query) {
    const [name, paramsList] = query.split('=');
    const params = paramsList.split(',');
    urlObj.query = { name, params };
  }
  return urlObj;
};

const createUser = function (name) {
  return {
    name,
    owes: {},
    owed_by: {},
    balance: 0,
  };
};

const borrowMoney = function (lender, borrower, amount) {
  const difference = (lender.owes[borrower.name] || 0) - amount;
  if (difference > 0) {
    lender.owes[borrower.name] = difference;
    borrower.owed_by[lender.name] = difference;
  } else if (difference < 0) {
    delete lender.owes[borrower.name];
    delete borrower.owed_by[lender.name];
    if (!lender.owed_by[borrower.name]) lender.owed_by[borrower.name] = 0;
    lender.owed_by[borrower.name] += Math.abs(difference);
    if (!borrower.owes[lender.name]) borrower.owes[lender.name] = 0;
    borrower.owes[lender.name] += Math.abs(difference);
  } else {
    delete lender.owes[borrower.name];
    delete borrower.owed_by[lender.name];
  }
  lender.balance += amount;
  borrower.balance -= amount;
};

export class RestAPI {
  #data;
  constructor(data = { users: [] }) {
    this.#data = data;
  }

  get(url) {
    const urlObj = parseUrl(url);
    if (!urlObj.base === '/users') throw new Error('404');
    if (!urlObj.query) return this.#data;
    if (urlObj.query.name === 'users') {
      const users = this.#data.users.filter((user) =>
        urlObj.query.params.includes(user.name)
      );
      return { users };
    }
  }

  post(url, payload) {
    const urlObj = parseUrl(url);
    if (urlObj.base === '/add') {
      const { user: name } = payload;
      const user = createUser(name);
      this.#data.users.push(user);
      return user;
    } else if (urlObj.base === '/iou') {
      const lender = this.#data.users.find(
        (user) => user.name === payload.lender
      );
      const borrower = this.#data.users.find(
        (user) => user.name === payload.borrower
      );
      borrowMoney(lender, borrower, payload.amount);
      const users = [lender, borrower].sort((a, b) =>
        a.name < b.name ? -1 : 1
      );
      return { users };
    }
  }
}
