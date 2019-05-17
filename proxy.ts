import * as http from 'http';
import * as https from 'https';
import * as url from 'url';


console.log(http.globalAgent)

// TODO I need to catch all errors so that the server never crashes
// TODO make sure the proxy can handle the entire path with the search query...Podcrypt I believe is removing the search query inappropriately somehow...ah yes, I believe it is because of how I am parsing the url based on &=?, if there is a search query within another search query value, it doesn't work...
// TODO the proxy needs to be served over ssl, it needs to be an https proxy eventually
const server = http.createServer((req, res) => {
    // console.log(req.url);
    const parsedUrl = url.parse(req.url);
    console.log('parsedUrl', parsedUrl);
    const path = parsedUrl.path.slice(1);

    const requestLibrary = path.startsWith('https') ? https : http;

    console.log(path);
    // res.end('It works!');

    // req.pipe(http.request(path)).pipe(res);
    // http.request(path).pipe(res);
    // console.log(http.request(path));
    // http.request(path).pipe();

    console.log(req.headers)


    // {
    //     path,
    //     // headers: createProxyRequestHeaders(req.headers)
    // }

    req.pipe(requestLibrary.request(path, {
        // hostname: 'podcrypt.app',
        // headers: req.headers
        // headers: createProxyRequestHeaders(req.headers)
        // user
        headers: {
            'user-agent': http.globalAgent
        }
    }, (res2) => {
        console.log(res2.headers);

        res.writeHeader(res2.statusCode, {
            ...createResponseHeaders(res2.headers),
            // TODO I really want to limit this to localhost and podcrypt.app, but there's that multiple value issue. Fix this eventually
            'Access-Control-Allow-Origin': '*'
        });
        res2.pipe(res);
    }));

    // req.pipe(thing);

    // response.pipe();
});

function createProxyRequestHeaders(trueRequestHeaders) {
    return Object.keys(trueRequestHeaders).reduce((result, headerKey) => {
        if (headerKey.toLowerCase() === 'user-agent') {
            return result;
        }
        else {
            return {
                [headerKey]: trueRequestHeaders[headerKey]
            };
        }
    }, {});

}

function createResponseHeaders(trueResponseHeaders) {
    return Object.keys(trueResponseHeaders).reduce((result, headerKey) => {
        if (headerKey.toLowerCase() === 'access-control-allow-origin') {
            return result;
        }
        else {
            return {
                [headerKey]: trueResponseHeaders[headerKey]
            };
        }
    }, {});
}


const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});