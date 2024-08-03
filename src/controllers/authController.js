import { matchedData, validationResult } from 'express-validator';
import User from '../mongoose/schemas/user.js';
import { hashPassword } from '../utils/crypt.js';
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';
import { log } from 'node:console';

export const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(400).send('Error logging out');
        }

        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Error destroying session');
            }

            res.clearCookie('connect.sid', { path: '/' });

            // Disable caching for the current response
            res.set('Cache-Control', 'no-store');
            res.set('Pragma', 'no-cache');
            res.set('Expires', '0');

            res.redirect('/login');
        });
    });
}

export const signup = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()){
        const errors = result.array();
        const errorMessage = {
            usernameError: errors.find(item => item.path === "username")?.msg,
            emailError: errors.find(item => item.path === "email")?.msg,
            passwordError: errors.find(item => item.path === "password")?.msg,
            confirmPasswordError: errors.find(item => item.path === "confirmPassword")?.msg
        };
        return res.status(400).render('signup', { errorMessage, title: "Signup | To-Do App" });
    }
    const { username, email, password } = matchedData(req);

    try {
        const usersWithSameUsername = await User.find({username});
        if(usersWithSameUsername.length > 0){
            return res.status(400).render('signup', { errorMessage: {usernameError: 'username is already taken!'}, title: "Signup | To-Do App" });
        }
        const usersWithSameEmail = await User.find({email});
        if(usersWithSameEmail.length > 0){
            return res.status(400).render('signup', { errorMessage: {emailError: 'There is already an account with that Email'}, title: "Signup | To-Do App" });
        }
    
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ username, email, password: hashedPassword });
        
        await newUser.save();
        next();
    } catch (error) {
        log(error);
        return res.status(500).render('errorPage', {
            code: 500,
            message: 'Error while creating the user account' ,
            title: "Server Error"
        });
    }
}

export const emailForgotten = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) return res.status(400).render('forgotPassword', { emailError: result.array()[0].msg, title: "Forgot your Password | To-Do App" });

    const { email } = matchedData(req);

    try {
        const user = await User.findOne({ email });

        if(!user) return res.status(400).render('forgotPassword', { emailError: 'User with this email does not exist.', title: "Forgot your Password | To-Do App" }) 

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000 // 1 hour

        await user.save();

        // Nodemailer setup
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        });

        const mailOptions = {
            from: 'no-reply@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                `http://${req.headers.host}/reset-password/${token}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        transporter.sendMail(mailOptions);

        res.status(200).render('forgotPassword', { successMessage: 'A password reset email has been sent to ' + user.email, title: "Forgot your Password | To-Do App" });
    } catch (error) {
        log(error.message);
        res.status(500).render('forgotPassword', { failureMessage: 'Error on the server.', title: "Forgot your Password | To-Do App" })
    }
}

export const getResetPasswordPage = async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        
        if(!user){
            return res.status(401).render('errorPage', {
                code: 401,
                message: 'Password reset token is invalid or has expired.',
                token,
                title: "Password Reset Error"
            })
        }
        res.render('resetPassword', { token: req.params.token, title: "Reset Password | To-Do App"})
    } catch (error) {
        res.status(500).render('errorPage', {
            code: 500,
            message: 'Internal server error. Please try again later.',
            title: "Server Error"
        });
    }
}

export const resetPassword = async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        const errors = result.array();
        const errorMessage = {
            passwordError: errors.find(item => item.path === "password")?.msg,
            confirmPasswordError: errors.find(item => item.path === "confirmPassword")?.msg
        }
        return res.send(400).render('resetPassword', { 
            token: req.params.token, 
            title: "Reset Password | To-Do App",
            errorMessage
        });
    }

    const { password } = matchedData(req);
    const { token } = req.params;
    
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        
        if(!user){
            return res.status(401).render('errorPage', {
                code: 401,
                message: 'Password reset token is invalid or has expired.',
                title: "Password Reset Error"
            })
        }

        user.password = await hashPassword(password);
        user.resetPasswordExpires = null;
        user.resetPasswordToken = null;

        await user.save();

        return res.redirect('/login');
    } catch (error) {
        console.log(error);
        return res.status(500).render('errorPage', {
            code: 500,
            message: 'Internal server error. Please try again later.',
            title: "Server Error"
        });
    }
}