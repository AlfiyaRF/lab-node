const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

mongoose.connect('mongodb://localhost:27017/mongodb');
const UserSchema = mongoose.Schema({name: String, password: String});
const User = mongoose.model('Users', UserSchema);

app.post('/tokens', (request, response, next) => {
    if (request.body.name && request.body.password) {
        console.log('I will add your data to the DB');
        const user = new User({name: request.body.name, password: request.body.password});
        user.save((error, savedUser) => {
            if (error) {
                throw error;
            }
            response.send(`Hi there ${savedUser.name}, I know your password: ${savedUser.password}`)
        });
    } else {
        console.log('I\'ve not gotten any data');
        response.end('You need to send user\'s data');
    }
});

app.listen(8080, () => {
    console.log('Server listening at post at port 8080');
    User.find({}, (err, user) => {
        console.log(
            'In the collection at the moment: ',
            user.map(u => u.name).join(' ')
        );
    })
});
