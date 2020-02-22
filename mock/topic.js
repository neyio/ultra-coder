import { delay } from 'roadhog-api-doc';
import mockjs from 'mockjs';

const proxy = {
  'GET /api/user/1/topic/': mockjs.mock({
    'data|10': [
      {
        'id|+1': 1,
        title: '@cparagraph',
        updated_at: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
      },
    ],
    total: 23,
  }),
  'GET /api/user/1/topic/*': mockjs.mock({
    id: 1,
    title: '@cparagraph',
    content: '@cparagraph',
    updated_at: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
  }),
  'POST /api/user/1/topic': mockjs.mock({
    'id|+1': 1,
    title: '@cparagraph',
    content: '@cparagraph',
    creatd_at: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
    updated_at: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
  }),
};

// 调用 delay 函数，统一处理
export default delay(proxy, 300);
