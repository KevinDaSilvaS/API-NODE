const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');
const Task = require('../models/task');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate('user');
        return res.status(200).send({ projects });
        
    } catch (error) {
        return res.status(400).send({ info: "Unable to list projects.", error });
    }
    
})

router.get('/:projectId', async (req, res) => {
    try {
        const { projectId } = req;
        const project = await Project.findOne({ projectId });
        return res.status(200).send({ project });
        
    } catch (error) {
        return res.status(400).send({ info: "Unable to find project.", error });
    }
})

router.post('/', async (req, res) => {
    try {
        const user = req.userId;
        const{ title, description, tasks } = req.body;
        const project = await Project.create({ title, description, user }); 

        await Promise.all(
            tasks.map(async (task) => {
                const projectTask = new Task({ ...task, project: project._id });

                await projectTask.save();
                project.tasks.push(projectTask);
            })
        );

        await project.save();
        return res.send({ project });

    } catch (error) {
        console.log(req.userId);
        return res.status(400).send({ error, info: "unable to create project"})
    }
    
})

router.put('/:projectId', async (req, res) => {
    try {
        const user = req.userId;
        const{ title, description, tasks } = req.body;
        const project = await Project.findByIdAndUpdate(req.params.projectId, { 
            title, 
            description
        }, {
            new: true,
        }); 

        project.tasks = [];
        await Task.remove({ project: project._id });

        await Promise.all(
            tasks.map(async (task) => {
                const projectTask = new Task({ ...task, project: project._id });

                await projectTask.save();
                project.tasks.push(projectTask);
            })
        );

        await project.save();
        return res.send({ project });

    } catch (error) {
        console.log(req.userId);
        return res.status(400).send({ error, info: "unable to update project"})
    }
})

router.delete('/:projectId', async (req, res) => {
    try {
        const { projectId } = req;
        await Project.findOneAndRemove({ projectId });
        return res.send();
        
    } catch (error) {
        return res.status(400).send({ info: "Unable delete project.", error });
    }
})

module.exports = app => app.use('/projects', router);