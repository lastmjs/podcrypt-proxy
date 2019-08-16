import * as corsProxy from 'cors-anywhere';

const server = corsProxy.createServer({
    // requireHeader: ['origin', 'x-requested-with'],
    // removeHeaders: [
    //     'cookie',
    //     'cookie2',
    //     // Strip Heroku-specific headers
    //     'x-heroku-queue-wait-time',
    //     'x-heroku-queue-depth',
    //     'x-heroku-dynos-in-use',
    //     'x-request-start',
    //   ],
    //   redirectSameOrigin: true,
    // originWhitelist: [],
    removeHeaders: [
        'x-forwarded-proto',
        'cookie',
        'authority',
        'method',
        'path',
        'scheme',
        'accept',
        'accept-encoding',
        'accept-language',
        'cache-control',
        'pragma',
        'upgrade-insecure-requests',
        'referer',
        'origin',
        'content-type',
        'connection'
    ],
    setHeaders: {
        // 'host': 'chtbl.com',
        // 'accept': '*/*',
        // I believe the documentation says that the header keys here should be lowercase strings
        // 'user-agent': 'Node.js',
        'user-agent': 'Node.js',
        // 'origin': 'https://proxy.podcrypt.app',
        // 'x-requested-with': 'XMLHttpRequest'
        // httpProxyOptions: {
        //     followRedirects: true
        // }
    },
    httpProxyOptions: {
        xfwd: false,
    //     // followRedirects: false,
    //     headers: {
    //         'origin': 'https://proxy.podcrypt.app',
    //     //     'x-requested-with': 'XMLHttpRequest'    
    //     }
    //     // changeOrigin: true,
    //     // hostRewrite: true,
    //     // autoRewrite: true
    }
});

server.on('request', (req) => {
    console.log(req.headers);

    delete req.headers['x-forwarded-for']
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});