import * as corsProxy from 'cors-anywhere';

const server = corsProxy.createServer({
    originWhitelist: [
        'http://localhost:5000',
        'https://podcrypt.app'
    ],
    removeHeaders: [
        'connection'
    ],
    setHeaders: {
        // I believe the documentation says that the header keys here should be lowercase strings
        'user-agent': 'Node.js',
    },
    httpProxyOptions: {
        // xfwd: false // TODO we should consider this for the privacy of the clients
    }
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});