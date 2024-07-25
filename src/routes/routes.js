import { Router } from 'express';
import authRouter from './auth.js';

const router = new Router();

router.get('/', (req, res) => {
    if(!req.user) return res.redirect("/login");
    res.render("index");
})

router.use(authRouter);

export default router;