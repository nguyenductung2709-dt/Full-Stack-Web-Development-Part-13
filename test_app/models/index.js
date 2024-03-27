const Note = require('./note')
const User = require('./user')


User.hasMany(Note) // 1 user can have many notes
Note.belongsTo(User) // 1 note can only belong to 1 user
Note.sync({ alter: true }) // alter: true means the tables in the database match changes made to the model definitions
User.sync({ alter: true })

module.exports = {
  Note, User
}