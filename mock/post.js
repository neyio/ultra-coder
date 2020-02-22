import { delay } from 'roadhog-api-doc';
import mockjs from 'mockjs';

const proxy = {
  'GET /api/post/1/comment': {
    // 接口描述
    $desc: '获取当前用户接口',
    // 接口参数
    $params: {
      page: {
        desc: '分页',
        exp: 1,
      },
      size: {
        desc: '条数',
        exp: 10,
      },
    },
    // 接口返回
    $body: mockjs.mock({
      'data|10': [{ title: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
      page: 1,
      size: 10,
      total: 25,
    }),

    // {
    //   data: Array.from({ length: 10 }).map((_, i) => ({
    //     title: `title - ${i}`,
    //     createdAt: Date.now(),
    //   })),
    //   page: 1,
    //   size: 10,
    //   total: 25,
    // },
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
  }),
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok' });
  },
};

// 调用 delay 函数，统一处理
export default delay(proxy, 1500);
