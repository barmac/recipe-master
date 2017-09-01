const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const router = express.Router();
const passport = require('./../config/passport');
const {ObjectID} = require('mongodb');
const Recipe = require('./../models/recipe');

const editableProperties = (body) => _.pick(body, ['name', 'desc', 'photoURL', 'ingredients', 'instructions', 'restricted']);
const currUserId = (header) => jwt.decode(header.substr(7), {json: true})._id;


// Get recipes
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const userId = currUserId(req.header('Authorization'));
  Recipe.find()
    .or([
    {restricted: false},
    {restricted: true, owner: userId}
    ])
    .sort('restricted')
    .then((recipes) => {
    res.send(recipes);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// Post recipe
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  let recipe = new Recipe(editableProperties(req.body));
  const userId = currUserId(req.header('Authorization'));
  recipe.owner = userId;
  recipe.save().then((recipe) => {
    res.send(recipe);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// Update recipe
router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  let id = req.params.id;
  let recipeUpdate = editableProperties(req.body);
  const userId = currUserId(req.header('Authorization'));
  if (!ObjectID.isValid(id)) {
    res.status(404).send({});
  } else {
    Recipe.findById(id)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).send({});
        } else {
          if (recipe.owner !== userId) {
            res.status(403).send({})
          } else {
            return Recipe.findByIdAndUpdate(recipe._id, recipeUpdate, {new: true, runValidators: true});
          }
        }
      })
      .then((newRecipe) => res.send(newRecipe))
      .catch((e) => {
      res.status(400).send(e);
    });
  }
});

// Delete recipe
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  let id = req.params.id;
  const userId = currUserId(req.header('Authorization'));
  if (!ObjectID.isValid(id)) {
    res.status(404).send({});
  } else {
    Recipe.findOne({_id: id})
      .then((recipe) => {
        if (!recipe) {
          res.status(404).send({});
        } else {
          if (recipe.owner !== userId) {
            res.status(403).send({});
          } else {
            return recipe.remove();
          }
        }
      })
      .then((recipe) => res.send(recipe))
      .catch((e) => {
      res.status(400).send(e);
    });
  }
});

// Get recipe
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
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
