const Fastify = require('fastify');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const fastify = Fastify({ logger: true });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Register routes
fastify.register(authRoutes);
fastify.register(taskRoutes);

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT });
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
