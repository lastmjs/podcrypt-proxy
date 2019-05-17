import * as corsProxy from 'cors-anywhere';

const server = corsProxy.createServer({
    originWhitelist: [],
    setHeaders: {
        'user-agent': 'node.js'
    }
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});