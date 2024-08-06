import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { taskValidationSchema, updateTaskValidationSchema } from '../utils/validation.js';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/tasksController.js';

const router = new Router();

router.get('/', (req, res) => res.redirect("/tasks"))

router.get('/tasks', getTasks);

router.post('/tasks', checkSchema(taskValidationSchema), createTask);

router.delete('/tasks/:id', deleteTask);

router.put('/tasks/:id', checkSchema(updateTaskValidationSchema), updateTask);

export default router;