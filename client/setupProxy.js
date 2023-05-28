const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with the specific domain of your React application
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

module.exports = function (app) {
  app.use(
    '/geoserver',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};