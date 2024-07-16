const taskController = require('../controllers/taskController');
const authMiddleware = require('../controllers/authMiddleware');

async function routes(fastify, options) {
  fastify.addHook('preHandler', authMiddleware.authenticate);
  
  fastify.post('/', taskController.createTask);
  fastify.get('/', taskController.getTasks);
  fastify.get('/:id', taskController.getTaskById);  // Add this route
  fastify.put('/:id', taskController.updateTask);
  fastify.delete('/:id', taskController.deleteTask);
}

module.exports = routes;
