import Events from './events';
const EventCenter = new Events();
export function stateReducer(state, action) {
  switch (action.type) {
    case 'test':
      return { ...state, test: 'yes!' };
    default:
      return state;
  }
}

const preduceEventReducer = (state, { type, payload }) => {
  switch (type) {
    case 'testEvent':
      return { ...state, test: 'event fired!' };
    default:
      if (!EventCenter[type]) {
        console.error('action.type maybe is not correct,can not find handle function');
        return state;
      }
      if (!payload) return { ...state, ...EventCenter[type]() };

      return Array.isArray(payload)
        ? { ...state, ...EventCenter[type](...payload) }
        : { ...state, ...EventCenter[type](payload) };
  }
};

const callbackHook = state => callback => {
  if (callback) {
    callback(state);
  }
  if (state.callbackData) {
    delete state.callbackData;
  }
  return { ...state };
};

export const eventReducer = (state, action) => {
  const { callback } = action;
  return callbackHook(Object.assign(state, preduceEventReducer(state, action)))(callback);
};
