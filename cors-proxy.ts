import * as corsProxy from 'cors-anywhere';

// TODO only allow podcrypt.app
const server = corsProxy.createServer({
    // originWhitelist: ['https://podcrypt.app'],
    removeHeaders: [
        // 'connection'
    ],
    setHeaders: {
        // I believe the documentation says that the header keys here should be lowercase strings
        'user-agent': 'Node.js',
    },
    httpProxyOptions: {
        // xfwd: false // TODO we should consider this for the privacy of the clients
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