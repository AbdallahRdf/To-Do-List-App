import Task from '../mongoose/schemas/task.js';
import { matchedData, validationResult } from 'express-validator';

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user.id });
        if(req.session.updateErrors){
            const options = req.session.updateErrors;
            delete req.session.updateErrors;
            return res.render('index', {tasks, user: req.user, ...options});
        }
        return res.render('index', { tasks, user: req.user, title: "Home | To-Do App" });
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
        res.redirect('/tasks');
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) throw new Error('Error during delete task: no such task is found');
        await task.deleteOne();
        return res.redirect('/tasks');
    } catch (error) {
        console.log(error.message);
    }
}

export const updateTask = async (req, res) => {
    try {
        const result = validationResult(req);
        if(!result.isEmpty()){
            const errors = result.array();
            const errorMessage = {
                titleError: errors.find(item => item.path === "title")?.msg,
                statusError: errors.find(item => item.path === "status")?.msg,
            }
            req.session.updateErrors = {
                title: "Home | To-Do App",
                errorMessage,
                taskId: req.params.id // id of task that is getting updated;
            }
            return res.redirect('/tasks');
        }
        const data = matchedData(req);
        const task = await Task.findById(req.params.id);
        await task.updateOne({ ...data });
        await task.save();
        res.redirect("/tasks");
    } catch (error) {
        console.log(error.message);
    }
}