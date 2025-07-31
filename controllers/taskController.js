 // controllers/taskController.js
 const createTask = (req, res) => {
    res.send("Task created");
};

const getTasks = (req, res) => {
    res.send("List of tasks");
};

module.exports = { createTask, getTasks };
