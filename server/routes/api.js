const config = require('./../config/config');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const usersRouter = require('./users');
const recipesRouter = require('./recipes');

// Connect
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodbUri, {
  useMongoClient: true
});

router.use('/users', usersRouter);
router.use('/recipes', recipesRouter);

module.exports = router;
