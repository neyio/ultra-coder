// import pathToRegexp from 'path-to-regexp';
export const METHODS = {
  DESTROY: 'delete', // 删除
  GET: 'get', // 获取
  CREATE: 'post', // 创建
  UPDATE: 'put', // 更新
  SHOW: 'get', // 获取指定数据
};

const mixUrl = (prefix, root, sub = false, ignoreSub = false) => {
  if (ignoreSub) return sub ? `${prefix}/${root}/:${root}Id/${sub}` : `${prefix}/${root}`;
  return sub ? `${prefix}/${root}/:${root}Id/${sub}/:${sub}Id` : `${prefix}/${root}/:id`;
};

export const routeMap = {
  post: {
    ...generateRestfullRoutes('post'),
    comment: {
      ...generateRestfullRoutes('post.comment'),
    },
  },
};

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

export default routeMap;
