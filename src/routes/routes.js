import { Router } from 'express';
import authRouter from './auth.js';
import tasksRouter from './tasks.js';
import userRouter from './user.js';

const router = new Router();

// router.use((req, res, next) => {
//     res.locals.messages = req.flash();
//     next();
// });

router.use(authRouter);

router.use((req, res, next) => {
    if(!req.user) return res.redirect("/login");
    next();
})

router.use(tasksRouter);
router.use(userRouter);

router.use((req, res) => res.render('errorPage', {
    code: 404,
    message: 'Not Found',
    title: "not found"
}));

export default router;