const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await prisma.member.findUnique({
				where: {
					name: username,
				},
			});
			if (!user) {
				console.log('Incorrect username');
				return done(null, false, { message: 'Incorrect username' });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				console.log('Plaintext Password:', password);
				console.log('Hashed Password from DB:', user.password);
				console.log('Incorrect password');
				return done(null, false, { message: 'Incorrect password' });
			}

			return done(null, user);
		} catch (err) {
			console.error('Error during authentication:', err);
			return done(err);
		}
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await prisma.member.findUnique({
			where: {
				id: id,
			},
		});
		done(null, user);
	} catch (err) {
		done(err, null);
	}
});

module.exports = passport;
