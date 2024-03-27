const Note = require('./note')
const User = require('./user')


User.hasMany(Note) // 1 user can have many notes
Note.belongsTo(User) // 1 note can only belong to 1 user

module.exports = {
  Note, User
}