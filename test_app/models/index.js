const Note = require('./note')

Note.sync()
User.sync()

module.exports = {
  Note, User
}