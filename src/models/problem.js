import { NAMESPACE as REQUEST_NAMESPACE } from './request';
import { pick } from '../utils/helpers';

const NAME_SPACE = 'problem';
export default {
  namespace: NAME_SPACE,
  state: {
    total: 0,
    updatedAt: null,
    items: {},
    statistics: {},
  },
  effects: {
    *loadProblemStatistics({ payload }, { put, call, select }) {
      const request = yield select(state => state[REQUEST_NAMESPACE].restfulApiRequest);
      // res =>{ tags:[],total }
      const response = yield call(request, 'statistics.problem');
      try {
        console.log('TCL: *loadProblemStatistics -> response', response);
        const pickedData = pick(response, ['total', 'tags']);
        yield put({
          type: 'setProblemStatistics',
          payload: pickedData,
        });
      } catch (e) {
        throw e;
      }
    },
    *loadProblemById({ payload: { id, callback } }, { put, call, select }) {
      const { items, request } = yield select(state => ({
        items: state[NAME_SPACE]['items'],
        request: state[REQUEST_NAMESPACE].request,
      }));
      if (items[id]) {
        return callback(items[id]);
      }
      const response = yield call(request, 'problem.show', { id });
      yield put({
        type: 'setProblem',
        payload: { id, response },
      });
      callback(response);
    },
  },
  reducers: {
    setProblemStatistics(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setProblem(state, { payload: { id, response } }) {
      state.items[id] = response; //dva-immer
    },
  },
};
