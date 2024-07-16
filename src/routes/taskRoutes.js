const taskController = require('../controllers/taskController');

async function routes(fastify, options) {
  fastify.addHook('preHandler', taskController.authenticate);

  fastify.post('/tasks', taskController.createTask);
  fastify.get('/tasks', taskController.getTasks);
  fastify.put('/tasks/:id', taskController.updateTask);
  fastify.delete('/tasks/:id', taskController.deleteTask);
}

module.exports = routes;
