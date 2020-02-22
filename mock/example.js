import { delay } from 'roadhog-api-doc';
import mockjs from 'mockjs';

const proxy = {
  'GET /api/example/1/city': (req, res) => {
    res.send(
      mockjs.mock({
        'data|10': [{ title: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
        total: 25,
      }),
    );
  },
};

// 调用 delay 函数，统一处理
export default delay(proxy, 1500);
