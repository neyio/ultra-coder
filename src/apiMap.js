export default {
  auth: {
    restful: false,
    urls: {
      signIn: ['/api/signIn', 'post'],
      logout: ['/api/logout'],
    },
  },
  statistics: {
    urls: {
      problem: ['/api/statistics/problem', 'get'],
    },
  },
  post: {
    restful: true,
    comment: {
      restful: true,
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
