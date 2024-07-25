import { Router } from 'express';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { loginValidationSchema, signupValidationSchema } from '../utils/validation.js';
import User from '../mongoose/schemas/user.js';
import passport from 'passport';
import { hashPassword } from '../utils/crypt.js';

const router = new Router();

router.get('/signup', (req, res) => res.render('signup'))

router.get('/login', (req, res) => res.render('login'))

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.sendStatus(400);
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.sendStatus(500);
            }
            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
    });
});

router.post(
    '/login',
    checkSchema(loginValidationSchema), 
    (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).send({ error: result.array() });
        next();
    },
    passport.authenticate('local'),
    (req, res) => res.redirect('/')
)

router.post(
    '/signup',
    checkSchema(signupValidationSchema),
    async (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).send({ error: result.array() });
        const { username, email, password } = matchedData(req);
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ username, email, password: hashedPassword });
        try {
            await newUser.save();
            next();
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ msg: 'Error while creating the user account' });
        }
    },
    passport.authenticate('local'),
    (req, res) => res.redirect('/')
);

export default router;