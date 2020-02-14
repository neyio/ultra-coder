import pathToRegexp from 'path-to-regexp';
import { pickAll, filter, omit, mergeDeepWithKey, forEachObjIndexed, equals } from 'ramda';

// 使用方法见 96行
export const manualMixUrl = (prefix, url = false) => method => {
  return url ? { url: `${prefix}/${url}`, method } : { url: `${prefix}`, method };
};

export const METHODS = {
  DESTROY: 'delete', // 删除
  GET: 'get', // 获取
  CREATE: 'post', // 创建
  UPDATE: 'put', // 更新
  SHOW: 'get', // 获取指定数据
};

export const initMethods = (key, value) => {
  if (METHODS[key]) METHODS[key] = value;
  else {
    console.warn(`${key} is not exsists in ${METHODS}`);
  }
};

export const apiMapToRouteMapAdapter = apis => {
  const reservedKeys = ['restful', 'urls', 'as', 'prefix'];
  const _dp = (obj, prefixPath = '') => {
    if (prefixPath === '') {
      return Object.keys(obj).reduce((p, k) => {
        return { ...p, [k]: { ..._dp(obj[k], k) } };
      }, {});
    }

    if (obj && typeof obj === 'object') {
      const _proKeysObj = pickAll(reservedKeys, obj);
      const mergeRestful = (mark, prefixPath) => {
        if (mark && prefixPath) {
          return generateRestfullRoutes(prefixPath);
        }
        return {};
      };
      const mergeCustomUrls = urlsObject => {
        if (!urlsObject) {
          return {};
        }
        return Object.entries(urlsObject).reduce((pre, [key, value]) => {
          let route = {};
          if (!value) {
            console.error(
              '错误的输入',
              prefixPath,
              'key为',
              key,
              '必须为[url,method]或{url,method}',
            );
            return { ...pre };
          }
          if (typeof value === 'object' && Array.isArray(value)) {
            const [url = '', method = 'get'] = value;
            route = {
              [key]: {
                url,
                method,
              },
            };
          } else {
            const { url = '', method = 'get' } = value;
            route = {
              [key]: {
                url,
                method,
              },
            };
          }

          return {
            ...pre,
            ...route,
          };
        }, {});
      };
      const mergeInKeys = omit(reservedKeys, obj);
      const dpSearchedRoutes = Object.keys(mergeInKeys).reduce((p, k) => {
        return { ...p, [k]: { ..._dp(obj[k], `${prefixPath}.${k}`) } };
      }, {});
      return {
        ...mergeRestful(_proKeysObj.restful, prefixPath),
        ...mergeCustomUrls(_proKeysObj.urls),
        ...dpSearchedRoutes,
      };
    }
    return {};
  };
  return _dp(apis);
};

// console.log(
// 	'请前往utils/apis.js修改路由描述表，并mixin入下方的routeMap变量中以开启使用',
// 	'TestApis ===> ',
// 	apiMapToRouteMapAdapter(TestApis),
// 	'restful对应的名称为',
// 	METHODS
// );

/**
 * 系统路由表,测试数据如下
 * let defaultRouteMap = {
 * 	problem: { ...generateRestfullRoutes('problem') },
 *	statistics: {
 *		problem: manualMixUrl('/api/statistics', 'problem')('get')
 *	},
 *	post: {
 *		...generateRestfullRoutes('post'),
 *		comment: {
 *			...generateRestfullRoutes('post.comment')
 *		}
 *	 }
 */

let defaultRouteMap = {};

export const routeMap = {
  merge(map, concatValues = (_a, _b, r) => r) {
    defaultRouteMap = mergeDeepWithKey(concatValues, defaultRouteMap, apiMapToRouteMapAdapter(map));
    return defaultRouteMap;
  },
  reset(map = {}) {
    defaultRouteMap = apiMapToRouteMapAdapter(map);
    console.log('TCL: reset -> defaultRouteMap', defaultRouteMap);

    return defaultRouteMap;
  },
  get() {
    return defaultRouteMap;
  },
  set(key, value) {
    defaultRouteMap[key] = apiMapToRouteMapAdapter(value);
    return defaultRouteMap;
  },
  check(needImplementApi) {
    console.groupCollapsed('CHECK API_MAP');
    const outPuts = {};
    const coverageRight = (checkedObj, obj = {}, _path = []) => {
      forEachObjIndexed((value, key) => {
        const _keyChain = _path.concat(key).join('.');
        if (typeof value === 'object') {
          if (!checkedObj[key]) {
            return (outPuts[_keyChain] = false);
          } else if (Array.isArray(value)) {
            return (outPuts[_keyChain] = equals(checkedObj[key], value));
          } else {
            // when met a route(which has url & method)
            if (value.method && value.url) {
              return (outPuts[_keyChain] = equals(checkedObj[key], value));
            }
            return coverageRight(checkedObj[key], value, _path.concat(key));
          }
        } else {
          const _ans = equals(checkedObj[key], value);
          if (!_ans) console.warn(`${_keyChain} has not been implemented yet!`);
          return (outPuts[_keyChain] = _ans);
        }
      }, obj);
    };
    const current = apiMapToRouteMapAdapter(needImplementApi);
    coverageRight(defaultRouteMap, current, []);
    const ans = {
      unpassed: filter(value => !value, outPuts),
      passed: filter(value => !!value, outPuts),
    };
    console.log(ans);
    console.groupEnd('CHECK API_MAP');
    console.error('please check these api which have not been implemented.', ans.unpassed);
    return ans;
  },
};

// 如果是 类似 umi-request  需要实现 return request(url, { method,...data,...extra,});
// creator = (requestCreator, options) => {
//   const { url ,...restOptions} = options;
//   return requestCreator(url,restOptions)
// }
const createRequest = (
  RequestCreator,
  routeMap = {},
  creator = (requestCreator, options) => requestCreator(options),
) => (keyChain, ...args) => {
  let params = {},
    body = {},
    extra = {};

  const safeGet = (obj, keyChain) => {
    if (!keyChain) {
      throw new Error(`keyChain is falsy`);
    }
    const keys = keyChain.split('.');
    return keys.reduce((pre, i) => {
      if (pre && typeof pre === 'object') {
        return pre[i];
      }
      return undefined;
    }, obj);
  };
  const fullApiMap = { ...defaultRouteMap, ...routeMap };
  const route = safeGet(fullApiMap, keyChain);

  if (route) {
    const { url, method } = route;

    const parsedRoute = pathToRegexp.parse(url);
    if (!parsedRoute) {
      throw new Error(`路由表解码错误，请检查${route}的路由`);
    } else {
      console.log('keyChain=>', keyChain, 'route=>', route, 'parsedRoute=>', parsedRoute);
      const needParams = parsedRoute.reduce((pre, i) => {
        if (typeof i === 'object' && !i.optional) {
          return pre + 1;
        }
        return pre;
      }, 0);
      console.log(`需要注入参数为${needParams}个`);
      if (needParams === 0 && args.length === 1) {
        [body = {}] = args;
      } else {
        [params = {}, body = {}, extra = {}] = args;
      }
    }
    const mixedUrl = pathToRegexp.compile(url)(params);
    if (body.method || extra.method) {
      console.warn(
        '请不要在参数中，传入保留字method，后续可能被废弃，当前依然会执行你希望的操作。',
      );
    }
    const data = [METHODS.CREATE, METHODS.UPDATE].includes(method)
      ? { data: body }
      : { params: body };

    return creator(RequestCreator, { url: mixedUrl, method, ...data, ...extra });
  } else {
    console.log('TCL: _dp -> fullApiMap, keyChain', fullApiMap, keyChain);
    console.error('请检查', keyChain, '是否存在在路由表上', fullApiMap);
    throw new Error(keyChain);
  }
};

// 使用方法
// import req, { routeMap } from '@/utils/routes';
// req('post.comment.show', { postId: 1, commentId: 2 }, { name: '3' });
export default createRequest;

export function generateRestfullRoutes(descriptor, prefix = '/api', others = {}) {
  const splitted = descriptor.split('.');
  const [a, b] = splitted;

  return {
    get: { url: mixUrl(prefix, a, b, true), method: METHODS.GET },
    show: { url: mixUrl(prefix, a, b), method: METHODS.SHOW },
    update: { url: mixUrl(prefix, a, b), method: METHODS.UPDATE },
    destroy: { url: mixUrl(prefix, a, b), method: METHODS.DESTROY },
    create: { url: mixUrl(prefix, a, b, true), method: METHODS.CREATE },
    ...others,
  };
}

function mixUrl(prefix, root = false, sub = false, ignoreSub = false) {
  if (ignoreSub) return sub ? `${prefix}/${root}/:${root}Id/${sub}` : `${prefix}/${root}`;
  return sub ? `${prefix}/${root}/:${root}Id/${sub}/:${sub}Id` : `${prefix}/${root}/:id`;
}
