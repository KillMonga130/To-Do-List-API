const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Ensure this path is correct
require('dotenv').config();

// Use environment variable for JWT secret key
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Register function
exports.register = async (request, reply) => {
  const { username, password } = request.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return reply.code(400).send({ error: 'User already exists' });
    }

    // Create a new user
    const user = new User({ username, password }); 
    reply.code(201).send({ message: 'User registered successfully' });
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

// Login function
exports.login = async (request, reply) => {
  const { username, password } = request.body;

  try {
    // Authenticate user
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) { 
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    reply.code(200).send({ token });
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};
