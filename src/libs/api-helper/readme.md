# `restful-api-map`

> education restful-api-map 工具，用于快速生成可以访问的链接

## Usage

### 定义路由表 apis.js

```js
export default {
  auth: {
    restful: false,
    urls: {
      signIn: ['/api/signIn', 'post'],
      logout: ['/api/logout'],
    },
  },
  schedule: {
    restful: true,
    problem: {
      restful: true,
    },
    urls: {
      custom: {
        url: '/api/schedule/:scheduleId/custom',
        method: 'get',
      },
    },
  },
};

```
### 具体使用

```js
import restfulApiMap, { routeMap } from '@/plugins/api-helper';
import apis from './apis';

console.log('routeMap===>', routeMap.get());
let request = restfulApiMap(axios);
request('post.comment.create', { postId: 1 }, { title: 'shit' });
routeMap.reset(apis);
request = restfulApiMap(axios);
request('post.comment.create', { postId: 1 }, { title: 'shit' });
routeMap.merge({
	post: {
		restful: true,
		comment: {
			restful: true
		}
	}
});
request = restfulApiMap(axios);
request('post.comment.create', { postId: 1 }, { title: 'shit' });
console.log('final=====>', routeMap.get());
```
