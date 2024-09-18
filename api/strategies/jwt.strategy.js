const { Strategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const { config } = require('../config/config');
const UserService = require('../services/user.service');

const userService = new UserService();

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.jwtsecret
};

passport.use(
	new Strategy(options, (payload, done) => {
		userService.findUserById(payload.sub).then(user => {
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		});
	})
);
