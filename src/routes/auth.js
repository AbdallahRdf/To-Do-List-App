import passport from 'passport';
import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { loginValidationSchema, signupValidationSchema } from '../utils/validation.js';
import { logout, signup } from '../controllers/authController.js';
import { handleLoginValidationResult } from '../middleware/handleLoginValidtionResult.js';

const router = new Router();

router.get('/signup', (req, res) => res.render('signup', { title: "Sign-up | To-Do App"}))

router.get('/login', (req, res) => res.render('login', { messages: req.flash(), title: "Log-in | To-Do App"}))

router.get('/logout', logout);

router.post('/login', checkSchema(loginValidationSchema), handleLoginValidationResult, passport.authenticate('local', {
    successRedirect: '/tasks',
    failureRedirect: '/login',
    failureFlash: true
}));

router.post('/signup',checkSchema(signupValidationSchema), signup, passport.authenticate('local'), (req, res) => res.redirect('/tasks'));

export default router;