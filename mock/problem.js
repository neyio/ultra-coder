import { delay } from 'roadhog-api-doc';
// import mockjs from 'mockjs';

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
};

// 调用 delay 函数，统一处理
export default delay(proxy, 3000);
