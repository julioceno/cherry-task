const config = {
  appUrl: import.meta.env.VITE_API_BASEURL,
  secret: import.meta.env.VITE_JWT_SECRET,
  tokens: {
    accessToken: '@cherryTask:accessToken',
    refreshToken: '@cherryTask:refreshToken',
  },
};

export { config };
