import * as corsProxy from 'cors-anywhere';

const server = corsProxy.createServer({
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: [
        'cookie',
        'cookie2',
        // Strip Heroku-specific headers
        'x-heroku-queue-wait-time',
        'x-heroku-queue-depth',
        'x-heroku-dynos-in-use',
        'x-request-start',
      ],
      redirectSameOrigin: true,
    originWhitelist: [],
    setHeaders: {
        // I believe the documentation says that the header keys here should be lowercase strings
        // 'user-agent': 'Node.js',
        'origin': 'https://proxy.podcrypt.app',
        // 'x-requested-with': 'XMLHttpRequest'
        // httpProxyOptions: {
        //     followRedirects: true
        // }
    },
    httpProxyOptions: {
        xfwd: false,
        // followRedirects: false,
        // headers: {
        //     'origin': 'https://proxy.podcrypt.app',
        //     'x-requested-with': 'XMLHttpRequest'    
        // }
        // changeOrigin: true,
        // hostRewrite: true,
        // autoRewrite: true
    }
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});