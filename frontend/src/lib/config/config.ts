export const CONFIG = {
  API: {
    ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
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
    ENDPOINT: process.env.NEXT_PUBLIC_CLIENT_ENDPOINT,
    DRUM_MACHINE: '/drum-machine',
    DJ: '/dj',
    SEQUENCER: '/sequencer',
    USER: '/user',
    LOGIN: '/login',
    SIGN_UP: '/sign-up'
  }
};
