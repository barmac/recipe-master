const passport = require('passport');
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const {secret} = require('./auth');

const User = require('./../models/user');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};


const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  User.findOne({_id: jwt_payload._id}, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

passport.use('jwt', strategy);

module.exports = passport;
