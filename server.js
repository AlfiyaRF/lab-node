const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 8080;
const dbName = 'names.json';

let names = [];
if (fs.existsSync(dbName)) {
    names = JSON.parse(fs.readFileSync(dbName, 'utf8'));
    console.log('>>> names read from file: ', names);
}

const requestHandler = (request, response) => {
    const queryObject = url.parse(request.url, true).query;
    console.log(request.method);
    if (
        request.method === 'POST' &&
        queryObject.name &&
        request.headers.iknowyoursecret === 'TheOwlsAreNotWhatTheySeem'
    ) {
        names.push(queryObject.name);
        fs.writeFile(dbName, JSON.stringify(names), (err) => {
            if (err) {
                throw err;
            }
        });
        console.log('I know your secret! -', request.headers.iknowyoursecret);
        response.end(`Hello, ${names.join(', ')}!`);
    }
    if (
        request.method === 'POST' &&
        request.headers.whatwillsavetheworld
    ) {
        console.log('What will save the world? -', request.headers.whatwillsavetheworld);
    }
    response.end();
};

const server = http.createServer(requestHandler);

server.listen(port, (error) => {
    if (error) {
        return console.log('The exeption is happened: ', error);
    }
    console.log(`Server is listening on ${port}`);
});
