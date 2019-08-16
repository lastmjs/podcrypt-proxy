import * as corsProxy from 'cors-anywhere';

const server = corsProxy.createServer({
    originWhitelist: [],
    setHeaders: {
        'User-Agent': 'Node.js',
        'Origin': 'https://podcrypt.app'
    }
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});