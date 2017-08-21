const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var {Recipe} = require('./../models/recipe');

// Connect
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/RecipeMaster', {
  useMongoClient: true
});

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

// Recipe API
// Get recipes
router.get('/recipes', (req, res) => {
  Recipe.find().then((recipes) => {
    res.send({recipes});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// Post recipe
router.post('/recipes', (req, res) => {
  let recipe = new Recipe(req.body);
  recipe.save().then((doc) => {
    res.send(doc);
  }).catch((e) => {
    res.status(400).send(e);
  });
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
        res.send({recipe});
      }
    }).catch((e) => {
      res.status(400).send(e);
    });
  }
});


module.exports = router;
