const http = require('http');
const port = 8080;

const requestHandler = (request, response) => {
    console.log(request.method);
    response.end('Hello you!');
};

const server = http.createServer(requestHandler);

server.listen(port, (error) => {
    if (error) {
        return console.log('The exeption is happened: ', error);
    }
    console.log(`Server is listening on ${port}`);
});
