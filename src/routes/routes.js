import { Router } from 'express';
import authRouter from './auth.js';
import tasksRouter from './tasks.js';

const router = new Router();

router.use(authRouter);
router.use(tasksRouter)

export default router;