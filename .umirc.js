// ref: https://umijs.org/config/
// 配置见 https://umijs.org/zh/plugin/umi-plugin-react.html#%E4%BD%BF%E7%94%A8
const APP_NAME = 'Doodle Code Online Judge';
export default {
  treeShaking: true,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
    npmClient: 'cnpm', // 优先级低于 umi block add [block] --npm-client
  },
  theme: {
    'primary-color': '#0f2849', // 全局主色 #1890ff
    'link-color': 'rgba(0, 0, 0, 0.65)', // 链接色
    'success-color': '#52c41a', // 成功色
    'warning-color': '#faad14', // 警告色
    'error-color': '#f5222d', // 错误色
    'font-size-tiny': '10px', //最小字号
    'font-size-small': '12px', //最小字号
    'font-size-base': '14px', // 主字号
    'font-size-medium': '16px', // 中号
    'font-size-large': '18px', // 大号
    'font-size-extra-large': '22px', // 超大号
    'heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
    'text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
    'text-color-secondary': 'rgba(0, 0, 0, .45)', // 次文本色
    'disabled-color': 'rgba(0, 0, 0, .25)', // 失效色
    'border-radius-base': '4px', // 组件/浮层圆角
    'border-color-base': '#d9d9d9', // 边框色
    'border-color-light': 'rgba(0, 0, 0, 0.05)', // 几乎不可见
    'border-color-fake': '#f8f8f8', //浅色
    'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.10)', // 浮层阴影
    'btn-font-size-sm': '12px', //最小按钮的字号
    'space-base': '0.5rem',
  },
  // history: 'hash', 是否为 hash路由
  plugins: [
    [
      'umi-plugin-react', // ref: https://umijs.org/plugin/umi-plugin-react.html
      {
        antd: true,
        chunks: ['vendors', 'umi'],
        dva: {
          hmr: true,
          immer: true, // 用以简写reducer，不必每次返回一个新对象了，只需要对需要赋值的代码直接赋值即可
        },
        dynamicImport: { webpackChunkName: true },
        title: APP_NAME,
        dll: true,
        fastClick: true,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
            /plugins\//,
          ],
        },
        metas: [{ charset: 'utf-8' }],
      },
    ],
    [
      './src/extras/authorization',
      {
        appName: APP_NAME,
      },
    ],
  ],
};

/*
 * 增加优化插件 打包插件
 *  plugins: [
 *   ['umi-plugin-auto-externals', {
 *     packages: [ 'antd' ],
 *     urlTemplate: 'https://unpkg.com/{{ library }}@{{ version }}/{{ path }}',
 *     checkOnline: false,
 *   }],
 *   links: [{ rel: 'stylesheet', href: '/markdown.css' }], *
 *   scripts: [{ src: '/iconfont.js' }], *
 *   ssr: { *
 *     // https://github.com/liady/webpack-node-externals#optionswhitelist- *
 *     externalWhitelist: [], *
 *     // 客户端资源 manifest 文件名，默认是 ssr-client-mainifest.json *
 *     manifestFileName: 'ssr-client-mainifest.json', *
 *   }, *
 *   default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665 *
 *   dll features https://webpack.js.org/plugins/dll-plugin/ *
 *   dll: { *
 *     include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'], *
 *     exclude: ['@babel/runtime', 'netlify-lambda'], *
 *   },
 * ],
 **/
