import { NAMESPACE as REQUEST_NAMESPACE } from './request';
export default {
  namespace: 'example',
  state: {},
  effects: {
    *fetchCity({ payload }, { call, select }) {
      const { callback, testKeys } = payload;
      const request = yield select(state => state[REQUEST_NAMESPACE].restfulApiRequest);
      const response = yield call(request, 'example.city', { exampleId: 1 }, {});
      callback({ response, testKeys });
      try {
      } catch (e) {
        throw e;
      }
    },
  },
  reducers: {},
};
