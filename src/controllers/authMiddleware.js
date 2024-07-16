const jwt = require('jsonwebtoken');

exports.authenticate = async (req, reply) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return reply.code(401).send({ message: 'Access denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return reply.code(401).send({ message: 'Invalid token' });
  }
};
