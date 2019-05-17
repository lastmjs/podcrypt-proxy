// TODO this was an attempt at a general purpose proxy to get around cors issues in the browser
// TODO I did not go with this solution because I had too many issues popping up loading RSS feeds
// TODO I had to change the origin of the proxy request, and RSS feeds would sometimes load as HTML documents

import * as httpProxy from 'http-proxy';
import * as http from 'http';
import * as url from 'url';

const proxy = httpProxy.createProxyServer({});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
    proxyReq.setHeader('user-agent', 'node.js');
    proxyReq.setHeader('accept', 'text/xml');


    console.log(proxyReq);
});

proxy.on('proxyRes', (proxyRes, req, res, options) => {
    res.setHeader('access-control-allow-origin', '*');
});

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const path = parsedUrl.path.slice(1);

    console.log('path', path)

    proxy.web(req, res, {
        target: path,
        changeOrigin: true
    })
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});