import { delay } from 'roadhog-api-doc';
import mockjs from 'mockjs';

const proxy = {
  'GET /api/user/1/exam': mockjs.mock({
    'data|10': [
      {
        'id|+1': 1,
        title: '@cparagraph',
        'content|10': [
          {
            'id|1-1000': 500,
            title: '题目名称' + mockjs.mock('@id|1-1000'),
            type: 'choice',
            content: {
              options: ['<p>选项1</p>', '<p>选型2</p>'],
              content: '<p>区分' + mockjs.mock('@cparagraph') + '</p>',
              answer: ['a'],
              mode: 'single',
              'score|1-10': 5,
              optional: false,
            },
          },
        ],
        updated_at: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
      },
    ],
    total: 23,
  }),
  'GET /api/user/1/exam/*': mockjs.mock({
    id: 1,
    title: '@cparagraph',
    'content|10': [
      {
        'id|1-1000': 500,
        title: '题目名称' + mockjs.mock('@id|1-1000'),
        type: 'choice',
        content: {
          options: ['<p>选项1</p>', '<p>选型2</p>'],
          content: '<p>区分' + mockjs.mock('@cparagraph') + '</p>',
          answer: ['a'],
          mode: 'single',
          'score|1-10': 5,
          optional: false,
        },
      },
    ],
    updated_at: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
  }),
  'POST /api/user/1/exam': mockjs.mock({
    'id|+1': 1,
    title: '@cparagraph',
    content: '@cparagraph',
    creatd_at: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
    updated_at: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
  }),
};

// 调用 delay 函数，统一处理
export default delay(proxy, 300);
