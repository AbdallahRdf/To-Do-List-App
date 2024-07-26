import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { taskValidationSchema } from '../utils/validation.js';
import { createTask, getTasks } from '../controllers/tasksController.js';

const router = new Router();

router.get('/task', getTasks);

router.post('/task', checkSchema(taskValidationSchema), createTask);

export default router;