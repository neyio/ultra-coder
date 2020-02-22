import { delay } from 'roadhog-api-doc';
// import mockjs from 'mockjs';

const proxy = {
  'GET /api/system/oss-config': {
    dir: 'user-dir/',
    expire: '1577811661',
    host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
    accessId: 'c2hhb2RhaG9uZw==',
    policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
    signature: 'ZGFob25nc2hhbw==',
  },
};

// 调用 delay 函数，统一处理
export default delay(proxy, 300);
