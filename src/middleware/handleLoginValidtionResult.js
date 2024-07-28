import { validationResult } from 'express-validator';

export const handleLoginValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()){
        const errors = result.array();
        const errorMessage = {
            usernameError: errors.find(item => item.path === "username")?.msg,
            passwordError: errors.find(item => item.path === "password")?.msg
        };
        return res.status(400).render('login', { errorMessage, title: "Login | To-Do App" });
    }
    next();
}