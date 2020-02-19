import { delay } from 'roadhog-api-doc';
import mockjs from 'mockjs';

const proxy = {
  'GET /api/problem/*': {
    $desc: '获取问题的数据',
    // 接口参数
    $params: {},
    // 接口返回
    $body: {
      title: '字符串的最大公因子',
      description: '题目内容',
    },
  },
  'POST /api/problem/create': {
    $desc: '创建题目',
    $params: {
      title: '题目名称',
    },
  },
  'POST /api/user/1/problem': (req, res) => {
    res.send(
      mockjs.mock({
        title: '题目名称',
        content: {
          options: ['<p>选项1</p>', '<p>选型2</p>'],
          context: '<p>题目内容</p>',
          answer: ['a'],
          mode: 'single',
          score: 3,
          optional: false,
        },
      }),
    );
  },
  'GET /api/user/1/problem/*': (req, res) => {
    res.send(
      mockjs.mock({
        title: '题目demo',
        content: {
          options: ['<p>选项1</p>', '<p>选项2</p>'],
          context: '<p>题目内容</p>',
          answer: ['B'],
          mode: 'single',
          score: 3,
          optional: true,
        },
      }),
    );
  },
  'PUT /api/user/1/problem/*': (req, res) => {
    res.send(
      mockjs.mock({
        status: true,
      }),
    );
  },
};

// 调用 delay 函数，统一处理
export default delay(proxy, 300);
