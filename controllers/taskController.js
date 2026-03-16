// controllers/taskController.js
const Task = require('../models/Task.js');
const taskService = require('../services/task.service.js');
/**
 * POST /api/tasks
 * Create a task (linked to logged-in user)
 */
// const createTask = async (req, res) => {
//   try {
//     const { title, description, priority = 'Low', completed = false } = req.body;

//     if (!title) {
//       return res.status(400).json({ message: 'Title is required' });
//     }

//     const task = await Task.create({
//       title,
//       description,
//       completed,
//       priority,
//       user: req.user.id, // set by authMiddleware
//     });

//     res.status(201).json(task);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating task', error: error.message });
//   }
// };

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch(err){
    res.status(500).json({ message: err.message})
  }
}
/**
 * GET /api/tasks
 * Get all tasks for logged-in user
 */
const getTasks = async (req, res) => {
  try {
    //const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    const tasks = await taskService.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

/**
 * PUT /api/tasks/:id
 * Update a task by id
 */
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, priority, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

/**
 * DELETE /api/tasks/:id
 * Delete a task by id
 */
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};