const Task = require('../models/task');

exports.createTask = async (req, reply) => {
  const { title, completed } = req.body;
  const task = new Task({ title, completed });
  await task.save();
  reply.code(201).send(task);
};

exports.getTasks = async (req, reply) => {
  const tasks = await Task.find();
  reply.send(tasks);
};

exports.getTaskById = async (req, reply) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  
  if (!task) {
    return reply.code(404).send({ message: 'Task not found' });
  }
  
  reply.send(task);
};

exports.updateTask = async (req, reply) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = await Task.findByIdAndUpdate(id, { title, completed }, { new: true });
  
  if (!task) {
    return reply.code(404).send({ message: 'Task not found' });
  }
  
  reply.send(task);
};

exports.deleteTask = async (req, reply) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  
  if (!task) {
    return reply.code(404).send({ message: 'Task not found' });
  }
  
  reply.send({ message: 'Task deleted successfully' });
};
