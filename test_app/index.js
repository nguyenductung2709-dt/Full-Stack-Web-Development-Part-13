require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')

const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: false,
  },
});

//define model for Note
class Note extends Model {}
Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    /* if we want to have creation year
    creationYear: {
        type: DataTypes.INTEGER,
    */
    important: {
        type: DataTypes.BOOLEAN
    },
    date: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note',
})

app.get('/api/notes', async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes)
})

app.post('/api/notes', async (req, res) => {
    try {
        const note = await Note.create(req.body)
        return res.json(note)    
    /* alternative way to do this
    const note = Note.build(req.body); calling this does not save the object in the database yet, so you can edit the object before actual save
    await note.save(); actually save the object 
    */
    } catch(error) {
    return res.status(400).json({ error })
  }  
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})