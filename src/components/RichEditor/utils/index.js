const ID_PREFIX = 'ag-';
let id = 0;
export const getUniqueId = () => `${ID_PREFIX}${id++}`;

export const deepCopyArray = array => {
  const result = [];
  const len = array.length;
  let i;
  for (i = 0; i < len; i++) {
    if (typeof array[i] === 'object' && array[i] !== null) {
      if (Array.isArray(array[i])) {
        result.push(deepCopyArray(array[i]));
      } else {
        result.push(deepCopy(array[i]));
      }
    } else {
      result.push(array[i]);
    }
  }
  return result;
};

// TODO: @jocs rewrite deepCopy
export const deepCopy = object => {
  const obj = {};
  Object.keys(object).forEach(key => {
    if (typeof object[key] === 'object' && object[key] !== null) {
      if (Array.isArray(object[key])) {
        obj[key] = deepCopyArray(object[key]);
      } else {
        obj[key] = deepCopy(object[key]);
      }
    } else {
      obj[key] = object[key];
    }
  });
  return obj;
};

/**
 * 两个数组具备交集
 */
export const conflict = (arr1, arr2) => {
  return !(arr1[1] < arr2[0] || arr2[1] < arr1[0]);
};

/**
 * 转换keys为小写字符串，并将_转化为-
 * @params {string[]} keys 数组
 * @return { ...[oldKey]:convertKey } 返回hashMap映射
 */
export const genUpper2LowerKeyHash = keys => {
  return keys.reduce((acc, key) => {
    const value = key.toLowerCase().replace(/_/g, '-');
    return Object.assign(acc, { [key]: value });
  }, {});
};
