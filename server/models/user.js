// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret, saltRounds, expiresIn} = require('./../config/auth');

const UserSchema = new Schema({
  username: {
    type: String,
    minlength: 1,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 1,
    required: true
  }
});

UserSchema.methods.generateAuthToken = function () {
  let user = this;
  return jwt.sign({_id: user._id.toHexString()}, secret, {expiresIn});
};

UserSchema.methods.comparePassword = function (candidatePassword) {
  let user = this;
  return bcrypt.compare(candidatePassword, user.password);
};

UserSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, saltRounds).then(function(hash) {
        user.password = hash;
        next();
    });
  } else {
    next();
  }
});


module.exports = mongoose.model('User', UserSchema);
