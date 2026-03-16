const Task = require("../models/Task")
const { getAIPriority } = require("./ai.service")

const createTask = async(data) => {
    const aiPriority = await getAIPriority(data.description);
    const task = await Task.create({
        ...data,
        aiSuggestedPriority: aiPriority,
    });

  return task;
};

const getTasks = async () => {
  return Task.find().sort({ createdAt: -1 });
};

module.exports = {
  createTask,
  getTasks,
}