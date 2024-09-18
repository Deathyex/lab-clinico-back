const { Strategy } = require('passport-local').Strategy;
const passport = require('passport');
const AuthService = require('./../services/auth.service');

const authService = new AuthService();

const passportLocal = new Strategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	},
	async (email, password, done) => {
		try {
			const user = await authService.login(email, password);
			done(null, user);
		} catch (error) {
			done(error, false);
		}
	}
);

module.exports = passportLocal;
