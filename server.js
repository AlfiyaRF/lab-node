const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const dbInfo = 'info.json';
let token = '';

app.use(bodyParser.json());

app.use((request, response, next) => {
    if (request.method === 'GET') {
        console.log('I don\'t work with GET method');
        response.end('Try another method');
    }
    next();
});

app.post('/', (request, response, next) => {
    console.log('I don\'t know you, please authenticate');
    response.end('You need to authenticate');
});

app.post('/tokens', (request, response, next) => {
    token = '';
    if (request.body.name && request.body.password) {
        console.log('I will ask the DB does it know you');
        if (fs.existsSync(dbInfo)) {
            const info = JSON.parse(fs.readFileSync(dbInfo, 'utf8'));
            const userGood = (info) => {
                for (let i = 0; i < info.length; i++) {
                    if (
                        info[i].name === request.body.name &&
                        info[i].password === request.body.password
                    ) {
                        token = info[i].token;
                        return true;
                    }
                }
                return false
            };
            if (userGood(info)) {
                console.log('I\'ve sent you the token');
                response.end(token);
            } else {
                console.log('The DB doesn\'t know you');
                response.end(false);
            }
        } else {
            console.log('The DB doesn\'t exist');
            response.end(false);
        }
    } else {
        console.log('I\'ve not gotten any data');
        response.end('You need to send user\'s data');
    }
});

app.post('/accesses', (request, response, next) => {
    if (request.headers.token === token) {
        console.log('I can show you the content');
        response.end('Congratulations! You have access to content');
    } else if (request.headers.token) {
        console.log('Your token is wrong');
        response.end('Try again');
    } else {
        console.log('I\'ve not gotten the token');
        response.end('You need to send token');
    }
});

app.listen(8080, console.log('Server listening at post at port 8080'));
