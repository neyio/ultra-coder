import axios from 'axios';

import restfulApiMap, { routeMap } from '@/libs/api-helper'; // check package readme.md to know useage
import initialApis from '@/apiMap';
import { NAMESPACE as UserNamespace, ACTIONS as UserActions } from './user';

console.log('TCL: initialApis', initialApis);
export const NAMESPACE = 'request';
export const ACTIONS = {
  WATCH_USER_AUTH_ACTIONS: 'watchUserAuthActions',
  INIT_SUBSCRIPTION: 'initSubscription',
  RESET_REQUEST_CREATOR: 'resetRequestCreator',
  FETCH_RESTFUL_API: 'fetchRestfulApi',
};

export const request = axios.create();

request.interceptors.response.use(
  function(response) {
    return response && response.data;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default (({ initialApis = [], effects = {}, reducers = {}, subscriptions = {} }) => ({
  namespace: NAMESPACE,
  state: {
    request,
    restfulApiRequest: restfulApiMap(request),
    routeMap: routeMap.reset(initialApis),
    ACTIONS,
  },
  effects: {
    *[ACTIONS.WATCH_USER_AUTH_ACTIONS](_, { take, put, select }) {
      let setAxiosHeadersInterceptor = null;

      while (true) {
        const { type, payload } = yield take([
          `${UserNamespace}/${UserActions.LOGIN}`,
          `${UserNamespace}/${UserActions.LOGOUT}`,
        ]);
        console.groupCollapsed('USER AUTH: LOGIN|LOGOUT');
        console.log('TCL: watchUserAuthActions -> type', type, payload);
        console.groupEnd('USER AUTH: LOGIN|LOGOUT');
        const {
          tokens: { accessToken },
        } = payload;
        if (!accessToken) {
          console.warn(
            'access_token is not in payload , please check it ,interceptors inject failed ',
          );
          continue;
        }
        const preRequestCreator = yield select(state => state[NAMESPACE].request);
        // 如果 第二次覆盖，则重置请求器。
        if (setAxiosHeadersInterceptor && preRequestCreator) {
          preRequestCreator.interceptors.request.eject(setAxiosHeadersInterceptor);
        }
        // 如果是登陆 则 重建请求器，axios重新创建实例，废弃之前的请求器
        if (type === `${UserNamespace}/${UserActions.LOGIN}`) {
          if (!payload.isAuthenticated) {
            console.warn('ignore login action,please check if var(isAuthenticated) is true  ');

            continue;
          }
          const instance = axios.create();
          instance.interceptors.response.use(
            function(response) {
              // 对响应数据做点什么
              return response && response.data;
            },
            function(error) {
              // 对响应错误做点什么
              return Promise.reject(error);
            },
          );
          // 现在，在超时前，所有请求都会等待 5 秒
          instance.defaults.timeout = 5000;
          setAxiosHeadersInterceptor = instance.interceptors.request.use(
            config => {
              config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
              };
              return config;
            },
            error => {
              // eslint-disable-next-line no-undef
              return Promise.reject(error);
            },
          );
          const restfulApiRequest = restfulApiMap(instance);
          yield put({
            type: `${ACTIONS.RESET_REQUEST_CREATOR}`,
            payload: { request: instance, restfulApiRequest },
          });
          console.groupCollapsed('TEST:RESTFULAPIREQUEST');
          const fakeRequestCreator = restfulApiMap(instance, undefined, (_, options) => {
            return options;
          });
          console.log('fake request', fakeRequestCreator('rbac.login'));
          console.groupEnd('TEST:RESTFULAPIREQUEST');

          continue;
        }

        if (type === `${UserNamespace}/${UserActions.LOGOUT}`) {
          yield put({
            type: `${ACTIONS.RESET_REQUEST_CREATOR}`,
            payload: { request: null, restfulApiRequest: null },
          });
          continue;
        }
      }
    },
    *[ACTIONS.FETCH_RESTFUL_API]({ payload }, { select, call }) {
      const restfulApiRequest = yield select(state => state[NAMESPACE].restfulApiRequest);
      const { callback, ...body } = payload;
      try {
        const data = yield call(restfulApiRequest, ...body);
        callback(data);
      } catch (e) {
        throw e;
      }
    },
    *send({ payload }, { call }) {
      const {
        callback = res => {
          console.warn(
            '请在payload中增加callback以执行回调，否则你可能无法获取到执行的数据',
            '当前请求结果为:',
            res,
          );
        },
        options = {},
      } = payload;
      const response = yield call(axios, options);
      callback(response);
    },
    ...effects,
  },
  reducers: {
    [ACTIONS.RESET_REQUEST_CREATOR](state, { payload }) {
      const { request, restfulApiRequest } = payload;
      return {
        ...state,
        request,
        restfulApiRequest,
      };
    },
    ...reducers,
  },
  subscriptions: {
    [ACTIONS.INIT_SUBSCRIPTION]({ dispatch }) {
      dispatch({
        type: ACTIONS.WATCH_USER_AUTH_ACTIONS,
      });
    },
    ...subscriptions,
  },
}))({ initialApis });
