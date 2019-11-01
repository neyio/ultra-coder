import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

//持久化配置
const persistConfig = {
  timeout: 5000, // you can define your time. But is required.
  key: 'redux',
  storage,
  whitelist: ['problem'],
  stateReconciler: autoMergeLevel2,
};

// 创建 store 传入 dva
const persistEnhancer = () => createStore => (reducer, initialState, enhancer) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
  const persist = persistStore(store, null, (...hooks) => {
    console.log('get store', 'Hook to do sth when store is inited.');
  });
  return {
    persist,
    ...store,
  };
};

//额外开启的插件
const plugins = (() => (process.env.NODE_ENV === 'development' ? [require('dva-logger')()] : []))();

/**
 * 导出 dva 配置， 用于 pages/.umi导入使用
 */
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
    extraEnhancers: [persistEnhancer()],
  },
  plugins: [...plugins, { onReducer: reducer => persistReducer(persistConfig, reducer) }],
};
