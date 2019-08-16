import * as corsProxy from 'cors-anywhere';

const server = corsProxy.createServer({
    originWhitelist: [],
    setHeaders: {
        'user-agent': 'Node.js',
        'origin': 'https://proxy.podcrypt.app',
        'x-requested-with': 'XMLHttpRequest'
    }
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});