const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios').default;

const apiKey = 'c8ceb842169d01b6515defe9c20a25a0';
let jwt = null;
const getJWT = () => {
    if(jwt) return Promise.resolve({ token: jwt});
    return axios.post("https://api.thetvdb.com/login", {
        "apiKey": apiKey
    })
    .then((res) => res.data)
    .catch((err) => {
        console.log(err);
    });
}

module.exports = function(app) {
    app.use('/images', 
    createProxyMiddleware({
        target: 'https://artworks.thetvdb.com',
        changeOrigin: true,
        pathRewrite: {
          '^/images/': '/' // rewrite path
        }
      })
    )
  app.use(
    createProxyMiddleware('/api',{
      target: 'https://api.thetvdb.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/' // rewrite path
      }
    })
  );
};