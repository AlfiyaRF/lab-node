const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const setToken = require('./jwt');

const app = express();
let token;
mongoose.connect('mongodb://localhost:27017/mongodb', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  token: String
});
const User = mongoose.model('Users', UserSchema);

const localStrategy = new LocalStrategy(
  {nameField: 'name', passwordField: 'password'},
  (username, password, done) => {
    User.findOne({ name: username, password: password })
      .exec()
      .then((foundUsers) => {
        console.log(foundUsers);
        if (!foundUsers && !foundUsers.length) {
          done('Not found!');
        } else {
          done(null, foundUsers);
          console.log('Found: ', foundUsers);
        }
      });
  }
);
const bearerStrategy = new BearerStrategy((token, done) => {
  User.findOne({ token: token })
    .exec()
    .then(foundUsers => {
      if (!foundUsers) {
        done(null, false);
      }
      console.log('Found: ', foundUsers);
      done(null, foundUsers);
    });
});

passport.use('local', localStrategy);
passport.use('bearer', bearerStrategy);

passport.serializeUser((user, done) => {
  console.log('Serializing: ', user.name);
  token = setToken(user.name, user.password);
  User.updateOne(
    {name: user.name, password: user.password},
    {token: token},
    (err, updatedUser) => {
      done(null, updatedUser);
    }
  );
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(bodyParser.json());
app.use(passport.initialize());

app.post(
  '/token',
  passport.authenticate('local'),
  (req, res) => {
    res.send(token)
  }
);

app.get(
  '/session',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    res.send(`Good token, ${req.user.name}`);
  }
);

app.listen(8080, () => {
  console.log('Server listening at post at port 8080');
  User.find({}, (err, user) => {
    console.log(
      'In the collection at the moment:\n',
      user.map(u => {
        return (`${u.name} <<<>>> ${u.password} <<<>>> ${u.token}`)
      }).join('\n')
    );
  })
});
