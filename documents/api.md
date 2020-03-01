## 定义路由表

```json
{
  [key:string]:{
    restful?: boolean;
    urls?:{
      [key:string]:RouteMapInterface | [string,methodstring]|{url:string,method:string}
    }
  }
}
```

### Demo

```javascript
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

### USEAGE

