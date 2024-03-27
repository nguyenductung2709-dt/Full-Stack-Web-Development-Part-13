const Sequelize = require('sequelize')
const { SECRET } = require('./config.js')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error instanceof Sequelize.ValidationError) {
    const validationErrors = error.errors.map(err => err.message);
    return response.status(400).json({ error: 'Validation error: ' + validationErrors.join(', ') });
  } else if (error instanceof Sequelize.UniqueConstraintError) {
    return response.status(400).json({ error: 'Duplicate entry: ' + error.message });
  } else if (error instanceof Sequelize.DatabaseError) {
    return response.status(400).json({ error: 'Database error: ' + error.message });
  }

  return response.status(500).json({ error: 'Internal server error' });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log(jwt.verify(authorization.substring(7), SECRET))
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor
};
