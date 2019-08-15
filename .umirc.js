// ref: https://umijs.org/config/
// 配置见 https://umijs.org/zh/plugin/umi-plugin-react.html#%E4%BD%BF%E7%94%A8
export default {
  treeShaking: true,
  // history: 'hash', 是否为 hash路由
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
          immer: true, // 用以简写reducer，不必每次返回一个新对象了，只需要对需要赋值的代码直接赋值即可
        },
        dynamicImport: { webpackChunkName: true },
        title: 'UltraCode Online Judge',
        dll: true,
        fastClick: true,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
        //  chunks: ['vendor', 'umi'],
        //  scripts: [
        //    { src: 'http://cdn/a.js' },
        //    { src: '<%= PUBLIC_PATH %>a.js' },
        //    { content: `alert('a');` },
        //  ],
        //  headScripts: [],
        //  metas: [{ charset: 'utf-8' }],
        //  links: [{ rel: 'stylesheet', href: 'http://cdn/a.css' }],
        //chainWebpack && chunks https://umijs.org/zh/plugin/umi-plugin-react.html#chunks
      },
    ],
  ],
};
