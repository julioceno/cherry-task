const config = {
  appUrl: import.meta.env.VITE_API_BASEURL,
  cookies: {
    accessToken: '@cherryTask:token',
    refreshToken: '@cherryTask:refreshToken',
  },
};

export { config };
