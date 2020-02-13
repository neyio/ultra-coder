export const NAMESPACE = 'system';
export const ACTIONS = {
  SET_REDUX_PERSIST_RECOVER: 'setReduxPersistRecover',
};
export default () => ({
  namespace: NAMESPACE,
  state: {
    isReduxPersistRecover: false,
  },
  effects: {},
  reducers: {
    [ACTIONS.SET_REDUX_PERSIST_RECOVER](state, { payload }) {
      state.isReduxPersistRecover = payload;
    },
  },
});
