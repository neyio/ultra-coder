import { delay } from 'roadhog-api-doc';
// import mockjs from 'mockjs';

const proxy = {
  'GET /api/statistics/problem': {
    $desc: '获取题库的统计数据',
    // 接口参数
    $params: {},
    // 接口返回
    $body: {
      total: 1150,
      tags: [
        {
          id: 1,
          name: 'Array',
          total: 156,
        },
        {
          id: 2,
          name: 'Dynamic Programming',
          total: 149,
        },
        {
          id: 3,
          name: 'math',
          total: 139,
        },
      ],
      statistics: {
        1: {
          difficulty: 1, // 5表示最难,
          likes: 3256, //点赞数,
          dislikes: 4, //差评数
          collects: 1345, //收藏数
          comments: 106, //评论数
          solutions: 9, //解决方案数
          resolved: 6711, //通过了
          rejected: 3511, //拒绝了
        },
        2: {
          difficulty: 1, // 5表示最难,
          likes: 3256, //点赞数,
          dislikes: 4, //差评数
          collects: 1345, //收藏数
          comments: 106, //评论数
          solutions: 9, //解决方案数
          resolved: 6711, //通过了
          rejected: 3511, //拒绝了
        },
      },
    },
  },
};

// 调用 delay 函数，统一处理
export default delay(proxy, 1000);
