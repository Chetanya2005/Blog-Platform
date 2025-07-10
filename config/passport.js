const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../Models/user');

module.exports = (passport) => {
  passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) return done(null, false);
    const match = await bcrypt.compare(password, user.password);
    return match ? done(null, user) : done(null, false);
  }));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));
};