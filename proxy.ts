import * as http from 'http';

const server = http.createServer((req, res) => {
    res.end('It works!');
});

server.listen(process.env.PORT || 4000);