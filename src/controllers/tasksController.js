import Task from '../mongoose/schemas/task.js';
import { matchedData, validationResult } from 'express-validator';

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render('index', { tasks });
    } catch(error) {
        console.log(error.message);
    }
}

export const createTask = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ error: result.array() });
    const data = matchedData(req);
    const task = new Task({ ...data, owner: req.user.id });
    try {
        await task.save();
        res.redirect('/task');
    } catch (error) {
        console.log(error.message);
    }
}