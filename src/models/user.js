export default {
  namespace: 'user',

  state: {
    nickname: '测试用户',
    statics: {
      attemped: 33, //尝试题目数
      finished: 19, //解决题目数
      easy: 10, //简单
      normal: 2, //中等
      hard: 3, //困难
      lengend: 4, //极其难的
    },
    schedule: {
      currentId: 1,
      items: {
        1: {
          title: '预设的进度',
        },
      },
    },
    profile: {},
  },

  effects: {},

  reducers: {},
};
