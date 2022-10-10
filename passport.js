
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
const User = require('./models/Users')
const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy; 

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.KEY;

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    // console.log(jwt_payload);
User.findOne({ _id: jwt_payload.userId }, function (err, user) {
    if (err) {
        return done(err, false);
    }
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
});
}));