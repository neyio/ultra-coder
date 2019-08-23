import path from 'path';
export default function AuthorizationPagesInjectPlugin(api, { appName = 'Neyio' } = {}) {
  const extraRoutes = [
    {
      path: '/login',
      title: `${appName} | 登录`,
      layout: './pages/_layout.js',
      component: path.join(__dirname, './pages/Login.js'),
    },
    {
      path: '/register',
      title: `${appName} | 注册`,
      layout: './pages/_layout.js',
      component: path.join(__dirname, './pages/Register.js'),
    },
    {
      path: '/forgot-password',
      title: `${appName} | 忘记密码`,
      layout: './pages/_layout.js',
      component: path.join(__dirname, './pages/ForgotPassword.js'),
    },
  ];
  api.modifyRoutes(routes => {
    const mappedRoutes = new Map([...extraRoutes, ...routes].map(i => [i.path, i]));
    return [...mappedRoutes.values()];
  });
  const extraWatchPaths = extraRoutes.map(i => i.component);
  extraWatchPaths.concat(
    path.join(__dirname, './index.less'),
    path.join(__dirname, './pages/_layout.js'),
  );
  api.addPageWatcher(extraWatchPaths);
}
