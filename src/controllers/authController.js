const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (request, reply) => {
  const { username, password } = request.body;
  try {
    const user = new User({ username, password });
    await user.save();
    reply.code(201).send({ message: 'User registered successfully' });
  } catch (error) {
    reply.code(400).send({ error: error.message });
  }
};

exports.login = async (request, reply) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    reply.send({ token });
  } catch (error) {
    reply.code(401).send({ error: error.message });
  }
};
