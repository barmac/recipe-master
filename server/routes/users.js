const express = require('express');
const router = express.Router();
const _ = require('lodash');
const User = require('./../models/user');

// Register user
router.post('/', (req, res) => {
  let user = new User(_.pick(req.body, ['username', 'password']));
  user.save().then((user) => {
    res.send({});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// Login
router.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let user;
  User.findOne({username})
    .then((foundUser) => {
      user = foundUser;
      return user.comparePassword(password);
    })
    .then((result) => {
      if (result) {
        res.send({token: user.generateAuthToken(), id: user._id.toString()});
      } else {
        res.status(401).send({});
      }
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

module.exports = router;
