const Task = require('../models/Task.js')
const createTask = async (req, res) => {
    try {
        const { title, description, priority } = req.body;

        const task = await Task.create({
            title,
            description,
            priority: priority || 'medium',
            user: req.user.id
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
};

const getTasks = (req, res) => {
    res.send("List of tasks");
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority } = req.body;

        // Find the task by ID and update it
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { 
                title, 
                description, 
                priority 
            },
            { new: true } // returns updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({
            message: "Error updating task",
            error: error.message
        });
    }
};

module.exports = { createTask, getTasks, updateTask };
