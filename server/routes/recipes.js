const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const router = express.Router();
const passport = require('./../config/passport');
const {ObjectID} = require('mongodb');
const Recipe = require('./../models/recipe');

const editableProperties = (body) => _.pick(body, ['name', 'desc', 'photoURL', 'ingredients', 'instructions', 'restricted']);

// Get recipes
router.get('/', (req, res) => {
  Recipe.find().then((recipes) => {
    res.send(recipes);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// Post recipe
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  let recipe = new Recipe(editableProperties(req.body));
  const token = req.header('Authorization').substr(7);
  const decodedJwt = jwt.decode(token, {json: true});
  recipe.owner = decodedJwt._id;
  recipe.save().then((recipe) => {
    res.send(recipe);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// Update recipe
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  let id = req.params.id;
  let recipe = editableProperties(req.body);
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
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
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
router.get('/:id', (req, res) => {
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
