export const promisify = (fn) => (value) =>
  new Promise((resolve, reject) =>
    fn(value, (error, value) => (error ? reject(error) : resolve(value)))
  );

export const all = (promises) =>
  new Promise((resolve, reject) => {
    if (!promises) resolve();
    if (!promises.length) resolve([]);
    const arr = Array(promises.length);
    let count = 0;
    promises.forEach((promise, i) =>
      promise
        .then((res) => {
          arr[i] = res;
          count++;
          if (count === promises.length) resolve(arr);
        })
        .catch(reject)
    );
  });

export const allSettled = (promises) =>
  new Promise((resolve) => {
    if (!promises) resolve();
    if (!promises.length) resolve([]);
    const arr = Array(promises.length);
    let count = 0;
    promises.forEach((promise, i) =>
      promise
        .then((res) => {
          arr[i] = res;
          count++;
          if (count === promises.length) resolve(arr);
        })
        .catch((err) => {
          arr[i] = err;
          count++;
          if (count === promises.length) resolve(arr);
        })
    );
  });

export const race = (promises) =>
  new Promise((resolve, reject) => {
    if (!promises) resolve();
    if (!promises.length) resolve([]);
    promises.forEach((promise) => promise.then(resolve, reject));
  });

export const any = (promises) =>
  new Promise((resolve, reject) => {
    if (!promises) resolve();
    if (!promises.length) resolve([]);
    const arr = Array(promises.length);
    let count = 0;
    promises.forEach((promise, i) =>
      promise.then(resolve).catch((error) => {
        arr[i] = error;
        count++;
        if (count === promises.length) reject(arr);
      })
    );
  });
