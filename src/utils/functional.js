export const compose = (...funcs) => funcs.reduce((acc, func) => (...args) => acc(func(...args)));
export const pipeline = (...funcs) => funcs.reduce((acc, func) => (...args) => func(acc(...args)));

export const ifFlow = (...conditionActions) => (...args) => {
  for (const [condtion, action] of conditionActions) {
    if (condtion(...args)) return action(...args);
  }
};

export const Condition = {
  or: (...conditionFuncs) =>
    conditionFuncs.reduce(
      (acc, func) => (...args) => acc(...args) || func(...args),
      () => false,
    ),
  and: (...conditionFuncs) =>
    conditionFuncs.reduce(
      (acc, func) => (...args) => acc(...args) && func(...args),
      () => true,
    ),
};
