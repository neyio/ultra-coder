//从obj 的keys数组中 挑选指定的key
export const pick = (obj, keys = []) =>
  keys.reduce((pre, key) => ({ ...pre, [key]: obj[key] }), {});

