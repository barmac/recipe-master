const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
let mongoose = require('mongoose');
let {Recipe} = require('./../models/recipe');

// Connect
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
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
router.post('/recipes', (req, res) => {
  let recipe = new Recipe(req.body);
  recipe.save().then((recipe) => {
    res.send(recipe);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// Update recipe
router.put('/recipes/:id', (req, res) => {
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
router.delete('/recipes/:id', (req, res) => {
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
