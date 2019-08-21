import request from '../utils/routes';
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
    *loadProblemStatistics({ payload }, { put, call }) {
      // res =>{ tags:[],total }
      const response = yield call(request, 'statistics.problem');
      const pickedData = pick(response, ['total', 'tags']);
      yield put({
        type: 'setProblemStatistics',
        payload: pickedData,
      });
    },
    *loadProblemById(
      {
        payload: { id, callback },
      },
      { put, call, select },
    ) {
      const items = yield select(state => state[NAME_SPACE]['items']);
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
    setProblem(
      state,
      {
        payload: { id, response },
      },
    ) {
      state.items[id] = response; //dva-immer
    },
  },
};
