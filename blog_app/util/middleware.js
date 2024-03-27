const Sequelize = require('sequelize')

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

module.exports = {
  errorHandler
};
