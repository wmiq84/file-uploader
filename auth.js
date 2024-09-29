const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

passport.use(
    new LocalStrategy(async (name, password, done) => {
		console.log("Test");
        try {
            const user = await prisma.member.findUnique({
                where: {
                    name: name,
                },
            });

            if (!user) {
                return done(null, false, { message: 'Incorrect name' });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                // passwords do not match!
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
        } catch (err) {
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