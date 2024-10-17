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
  CLIENT: {
    ENDPOINT: process.env.CLIENT_ENDPOINT || 'http://localhost:3000',
    DRUM_MACHINE: '/drum-machine',
    DJ: '/dj',
    SEQUENCER: '/sequencer',
    USER: '/user',
    LOGIN: '/login',
    SIGN_UP: '/sign-up'
  }
};
