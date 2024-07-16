const Task = require('../models/task');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = async (request, reply, done) => {
  const token = request.headers['authorization']?.split(' ')[1];
  if (!token) return reply.code(401).send({ error: 'Token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    done();
  } catch (error) {
    reply.code(401).send({ error: 'Invalid token' });
  }
};

exports.createTask = async (request, reply) => {
  const { title, description, status } = request.body;
  try {
    const task = new Task({ title, description, status, user: request.user.id });
    await task.save();
    reply.code(201).send(task);
  } catch (error) {
    reply.code(400).send({ error: error.message });
  }
};

exports.getTasks = async (request, reply) => {
  const { status } = request.query;
  try {
    const tasks = await Task.find({ user: request.user.id, ...(status && { status }) });
    reply.send(tasks);
  } catch (error) {
    reply.code(400).send({ error: error.message });
  }
};

exports.updateTask = async (request, reply) => {
  const { id } = request.params;
  const updates = request.body;
  try {
    const task = await Task.findOneAndUpdate({ _id: id, user: request.user.id }, updates, { new: true });
    if (!task) throw new Error('Task not found');
    reply.send(task);
  } catch (error) {
    reply.code(400).send({ error: error.message });
  }
};

exports.deleteTask = async (request, reply) => {
  const { id } = request.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, user: request.user.id });
    if (!task) throw new Error('Task not found');
    reply.send({ message: 'Task deleted successfully' });
  } catch (error) {
    reply.code(400).send({ error: error.message });
  }
};
