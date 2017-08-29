const config = require('./../config/config');
const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const passport = require('./../config/passport');
const _ = require('lodash');
const mongoose = require('mongoose');
const Recipe = require('./../models/recipe');
const User = require('./../models/user');

// Connect
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodbUri, {
  useMongoClient: true
});

// User API
// Register user
router.post('/users', (req, res) => {
  let user = new User(_.pick(req.body, ['username', 'password']));
  user.save().then((user) => {
    res.send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// Login
router.post('/users/login', (req, res) => {
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
        res.send({token: user.generateAuthToken()});
      } else {
        res.status(401).send({});
      }
    })
    .catch((e) => {
      res.status(400).send(e);
  });
});

// Recipe API
// Get recipes
router.get('/recipes', (req, res) => {
  Recipe.find().then((recipes) => {
    res.send(recipes);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// Post recipe
router.post('/recipes', passport.authenticate('jwt', { session: false }), (req, res) => {
  let recipe = new Recipe(req.body);
  recipe.save().then((recipe) => {
    res.send(recipe);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// Update recipe
router.put('/recipes/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  let id = req.params.id;
  let recipe = req.body;
  if (!ObjectID.isValid(id)) {
    res.status(404).send({});
  } else {
    Recipe.findByIdAndUpdate(id, recipe, {new: true}).then((recipe) => {
      if (!recipe) {
        res.status(404).send({});
      } else {
        res.send(recipe);
      }
    }).catch((e) => {
      res.status(400).send(e);
    });
  }
});

// Delete recipe
router.delete('/recipes/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send({});
  } else {
    Recipe.findByIdAndRemove(id).then((recipe) => {
      if (!recipe) {
        res.status(404).send({});
      } else {
        res.send(recipe);
      }
    }).catch((e) => {
      res.status(400).send(e);
    });
  }
});

// Get recipe
router.get('/recipes/:id', (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send({});
  } else {
    Recipe.findById(id).then((recipe) => {
      if (!recipe) {
        res.status(404).send({});
      } else {
        res.send(recipe);
      }
    }).catch((e) => {
      res.status(400).send(e);
    });
  }
});


module.exports = router;
