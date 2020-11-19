const { createProxyMiddleware } = require('http-proxy-middleware');

// This allows the front-end to reference 'itself' and magically reach the backend server
// It also placates Google OAuth, who prefer requests and tokens to be used at a single endpoint
module.exports = (app) => {
  app.use(
    ['/api', '/auth'],
    createProxyMiddleware({
      target: 'http://localhost:5000'
    })
  );
};
