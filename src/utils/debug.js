export const consoleTableVar = obj => {
  if (typeof obj === 'object') {
    return console.table(
      Object.keys(obj).map(key => {
        return {
          key,
          value: obj[key],
        };
      }),
    );
  }
  console.log(obj);
};
