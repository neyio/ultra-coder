// ref: https://umijs.org/config/
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
          immer: true, // 用以简写reducer，不必每次返回一个新对象了，只需要对需要赋值的代码直接赋值即可
        },
        dynamicImport: { webpackChunkName: true },
        title: 'UltraCode Online Judge',
        dll: true,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
