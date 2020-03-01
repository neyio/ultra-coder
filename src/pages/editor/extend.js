export const flow = (...funcs) => (...args) =>
  funcs.reduceRight(
    (acc, func) => () => func(...args, acc),
    () => {},
  )();

export const slateExtend = (...configs) => {
  const combinedCofig = configs.reduce(
    (accConfig, config) =>
      Object.keys(config).reduce((acc, key) => {
        const prev = acc[key] || [];
        return {
          ...acc,
          [key]: [...prev, config[key]],
        };
      }, accConfig),
    {},
  );
  return Object.keys(combinedCofig).reduce(
    (acc, key) => ({
      ...acc,
      [key]: flow(...combinedCofig[key]),
    }),
    {},
  );
};
