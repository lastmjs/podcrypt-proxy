import * as corsProxy from 'cors-anywhere';

const server = corsProxy.createServer({
    originWhitelist: [],
    setHeaders: {
        // I believe the documentation says that the header keys here should be lowercase strings
        'user-agent': 'Node.js',
        'origin': 'https://proxy.podcrypt.app',
        // 'x-requested-with': 'XMLHttpRequest'
        // httpProxyOptions: {
        //     followRedirects: true
        // }
    },
    httpProxyOptions: {
        // followRedirects: true
        changeOrigin: true,
        // hostRewrite: true,
        // autoRewrite: true
    }
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});