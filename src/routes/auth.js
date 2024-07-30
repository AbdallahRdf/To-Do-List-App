import passport from 'passport';
import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { emailValidationSchema, loginValidationSchema, resetPasswordValidationSchema, signupValidationSchema } from '../utils/validation.js';
import { emailForgotten, getResetPasswordPage, logout, resetPassword, signup } from '../controllers/authController.js';
import { handleLoginValidationResult } from '../middleware/handleLoginValidtionResult.js';

const router = new Router();

// Prevent browser caching
router.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

// router.use((req, res, next) => {
//     if(req.user) return res.redirect("/");
//     next();
// })

router.get('/signup', (req, res) => res.render('signup', { title: "Sign-up | To-Do App"}))

router.get('/login', (req, res) => res.render('login', { message: req.flash(), title: "Log-in | To-Do App"}))

router.get('/forgot_password', (req, res) => res.render('forgotPassword', { title: "Forgot your Password | To-Do App"}))

router.get('/logout', logout);

router.get('/reset-password/:token', getResetPasswordPage);

router.post('/login', checkSchema(loginValidationSchema), handleLoginValidationResult, passport.authenticate('local', {
    successRedirect: '/tasks',
    failureRedirect: '/login',
    failureFlash: true,
    failureMessage: "Incorrect Credintials"
}));

router.post('/signup',checkSchema(signupValidationSchema), signup, passport.authenticate('local'), (req, res) => res.redirect('/tasks'));

router.post('/forgot_password', checkSchema(emailValidationSchema), emailForgotten);

router.post('/reset-password/:token', checkSchema(resetPasswordValidationSchema), resetPassword);

export default router;