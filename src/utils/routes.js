import pathToRegexp from 'path-to-regexp';
import Request from './request';

export const METHODS = {
  DESTROY: 'delete', // 删除
  GET: 'get', // 获取
  CREATE: 'post', // 创建
  UPDATE: 'put', // 更新
  SHOW: 'get', // 获取指定数据
};

/**
 * 系统路由表
 */
export const routeMap = {
  post: {
    ...generateRestfullRoutes('post'),
    comment: {
      ...generateRestfullRoutes('post.comment'),
    },
  },
};

export const createRequest = request => (keyChain, ...args) => {
  let params = {},
    body = {},
    extra = {};
  //   if (args.length >= 3) [params = {}, body = {}, extra = {}] = args;

  const safeGet = (obj, keyChain) => {
    const keys = keyChain.split('.');
    return keys.reduce((pre, i) => {
      if (pre && typeof pre === 'object') {
        return pre[i];
      }
      return void 0;
    }, obj);
  };

  const route = safeGet(routeMap, keyChain);

  if (route) {
    const { url, method } = route;
    // console.log(route, params, body);
    const parsedRoute = pathToRegexp.parse(url);
    if (!parsedRoute) {
      throw new Error(`路由表解码错误，请检查${route}的路由`);
    } else {
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
    return request(mixedUrl, {
      method,
      ...data,
      ...extra,
    });
  } else {
    console.error('请检查', keyChain, '是否存在在路由表上', routeMap);
  }
};

export default createRequest(Request);

function mixUrl(prefix, root, sub = false, ignoreSub = false) {
  if (ignoreSub) return sub ? `${prefix}/${root}/:${root}Id/${sub}` : `${prefix}/${root}`;
  return sub ? `${prefix}/${root}/:${root}Id/${sub}/:${sub}Id` : `${prefix}/${root}/:id`;
}

function generateRestfullRoutes(descriptor, prefix = '/api', others = {}) {
  const splitted = descriptor.split('.');
  const [a, b] = splitted;

  return {
    get: { url: mixUrl(prefix, a, b, true), method: METHODS.GET },
    show: { url: mixUrl(prefix, a, b), method: METHODS.SHOW },
    update: { url: mixUrl(prefix, a, b), method: METHODS.UPDATE },
    dstroy: { url: mixUrl(prefix, a, b), method: METHODS.DESTROY },
    create: { url: mixUrl(prefix, a, b, true), method: METHODS.CREATE },
    ...others,
  };
}
