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
