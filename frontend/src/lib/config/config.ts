export const CONFIG = {
  API: {
    ENDPOINT: process.env.API_ENDPOINT || 'http://localhost:8000/api',
    OAUTH: {
      FB: {
        SIGN_UP: '/user/signup/facebook'
      },
      G: {
        SIGN_UP: '/user/signup/google'
      }
    },
    METHODS: { USER: { GET_USER: '/user', LOGIN: '/user/login' } }
  },
  NEXT_API: {
    METHODS: {
      COOKIE: '/api/cookie'
    }
  }
};
