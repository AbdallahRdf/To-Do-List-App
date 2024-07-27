import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { taskValidationSchema } from '../utils/validation.js';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/tasksController.js';

const router = new Router();

router.use((req, res, next) => {
    if(!req.user) return res.redirect("/login");
    next();
})

router.get('/', (req, res) => res.redirect("/tasks"))

router.get('/tasks', getTasks);

router.post('/tasks', checkSchema(taskValidationSchema), createTask);

router.delete('/tasks/:id', deleteTask);

router.put('/tasks/:id', checkSchema(taskValidationSchema), updateTask);

export default router;