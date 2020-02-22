export default {
  auth: {
    restful: false,
    urls: {
      signIn: ['/api/signIn', 'post'],
      logout: ['/api/logout'],
    },
  },
  user: {
    restful: true,
    material: {
      restful: true,
    },
    topic: {
      restful: true,
    },
    problem: {
      restful: true,
    },
    exam: {
      restful: true,
    },
  },
  system: {
    restful: false,
    urls: {
      ossConfig: ['/api/system/oss-config', 'get'],
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
  example: {
    restful: false,
    urls: {
      city: {
        url: '/api/example/:exampleId/city',
        method: 'get',
      },
    },
  },
};
