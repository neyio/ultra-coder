import path from 'path';
export default function AuthorizationPagesInjectPlugin(api, { appName = 'Neyio' } = {}) {
  const extraRoutes = [
    {
      path: '/login',
      title: `${appName} | 登录`,
      component: path.join(__dirname, './pages/Login.js'),
    },
    {
      path: '/register',
      title: `${appName} | 注册`,
      component: path.join(__dirname, './pages/Register.js'),
    },
    {
      path: '/forget',
      title: `${appName} | 忘记密码`,
      component: path.join(__dirname, './pages/ForgetPassword.js'),
    },
  ];
  api.modifyRoutes(routes => {
    const mappedRoutes = new Map([...extraRoutes, ...routes].map(i => [i.path, i]));
    return [...mappedRoutes.values()];
  });
  const extraWatchPaths = extraRoutes.map(i => i.component);
  api.addPageWatcher(extraWatchPaths);
}
