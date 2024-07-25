import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { loginValidationSchema, signupValidationSchema } from "../utils/validation.js";
import User from '../mongoose/schemas/user.js';
import passport from "passport";
import { hashPassword } from "../utils/crypt.js";

const router = new Router();

router.get('/', (req, res) => res.render("index"))

router.get('/signup', (req, res) => res.render("signup"))

router.post(
    '/login', 
    checkSchema(loginValidationSchema), (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).send({ error: result.array() });
        next();
    }, 
    passport.authenticate("local"),
    (req, res) => res.render("home")
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
            res.status(500).send({ msg: "Error while creating the user account" });
        }
    },
    passport.authenticate("local"),
    (req, res) => res.render("home")
);

export default router;