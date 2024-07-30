import { Router } from 'express';
import authRouter from './auth.js';
import tasksRouter from './tasks.js';

const router = new Router();

// router.use((req, res, next) => {
//     res.locals.messages = req.flash();
//     next();
// });

router.use(authRouter);
router.use(tasksRouter)

export default router;