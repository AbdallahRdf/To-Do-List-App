import { Router } from 'express';
import authRouter from './auth.js';
import tasksRouter from './tasks.js';

const router = new Router();

router.get('/', (req, res) => {
    if(!req.user) return res.redirect("/login");
    res.render("index");
})

router.use(authRouter);
router.use(tasksRouter)

export default router;