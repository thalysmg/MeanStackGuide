const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Minha primeira respostaaa');
});

server.listen(process.env.PORT || 3000);
