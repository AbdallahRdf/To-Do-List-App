import { matchedData, validationResult } from 'express-validator';
import User from '../mongoose/schemas/user.js';
import { hashPassword } from '../utils/crypt.js';

export const logout = (req, res) => {
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
}

export const signup = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()){
        const errors = result.array();
        const errorMessage = {
            usernameError: errors.find(item => item.path === "username")?.msg,
            emailError: errors.find(item => item.path === "email")?.msg,
            passwordError: errors.find(item => item.path === "password")?.msg
        };
        return res.status(400).render('signup', { errorMessage, title: "Signup | To-Do App" });
    }
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
}