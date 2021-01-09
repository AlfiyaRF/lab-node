const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 8080;
const dbInfo = 'info.json';

let info = [];
if (fs.existsSync(dbInfo)) {
    info = JSON.parse(fs.readFileSync(dbInfo, 'utf8'));
    console.log('>>> information read from file: ', info);
}

const requestHandler = (request, response) => {
    const queryObject = url.parse(request.url, true).query;
    const ip = request.connection.remoteAddress;

    console.log(request.method);
    if (
        request.method === 'POST' &&
        queryObject.name &&
        request.headers.iknowyoursecret === 'TheOwlsAreNotWhatTheySeem'
    ) {
        info.push({name: queryObject.name, ip});
        fs.writeFile(dbInfo, JSON.stringify(info), (err) => {
            if (err) {
                throw err;
            }
        });
        console.log('I know your secret! -', request.headers.iknowyoursecret);
        response.end(`Hello, ${(info.map(item => item.name).join(', '))}!`);
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
