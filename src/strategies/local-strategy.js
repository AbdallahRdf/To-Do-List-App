import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../mongoose/schemas/user.js';
import { comparePassword } from '../utils/crypt.js';

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if(!user) throw new Error('No user found');
        done(null, user);
    } catch (error) {
        done(error, null);
    }
})

passport.use(
    new Strategy(
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
                if(!user) return done(null, false, { message: 'Invalid credentials'});

                const isPasswordCorrect = await comparePassword(password, user.password);
                if(!isPasswordCorrect) return done(null, false, { message: 'Invalid credentials'});

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
)