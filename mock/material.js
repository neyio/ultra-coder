import { delay } from 'roadhog-api-doc';
import mockjs from 'mockjs';

const proxy = {
  'GET /api/user/1/material/': mockjs.mock({
    'data|20': [
      {
        'id|+1': 1,
        title: '@cword(3, 5)',
        'parent_id|1-10': 5,
        'folder|1': true,
        updated_at: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        'size|+1': ['1.2gib', '24mib', '50mib', '1.3mib'],
        'ext|+1': ['pdf', 'pptx', 'docx', 'xls', 'xlsx', 'doc'],
      },
    ],
    total: 30,
  }),
  'GET /api/user/1/material/*': mockjs.mock({
    'data|5': [
      {
        'id|+1': 1,
        title: '@cword(3, 5)',
        parent_id: 1,
        'folder|1': true,
        updated_at: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        'size|+1': ['1.2gib', '24mib', '50mib', '1.3mib'],
        'ext|+1': ['pdf', 'pptx', 'docx', 'xls', 'xlsx', 'doc'],
      },
    ],
    total: 5,
  }),
};

// 调用 delay 函数，统一处理
export default delay(proxy, 300);
