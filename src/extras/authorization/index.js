import path from 'path';
export default function AuthorizationPagesInjectPlugin(api) {
  const extraRoutes = [
    {
      path: '/login',
      title: 'login page',
      component: path.join(__dirname, './pages/Login.js'),
    },
    {
      path: '/register',
      component: path.join(__dirname, './pages/Register.js'),
    },
    {
      path: '/forget',
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
