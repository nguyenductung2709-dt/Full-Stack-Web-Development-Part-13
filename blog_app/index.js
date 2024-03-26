require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize')

const express = require('express');
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: false,
    },
  });

class Blog extends Model {}
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
    },
},  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
}) 

Blog.sync()

app.get('/api/blogs', async(req,res) => {
    const blogs = await Blog.findAll()
    console.log(blogs)
    res.json(blogs)
})

app.post('/api/blogs', async(req,res) => {
    try {
        const newBlog = await Blog.create(req.body)
        return res.json(newBlog)
    }
    catch (err) {
        return res.status(400).json({ err })
    }
})

app.delete('/api/blogs/:id', async(req,res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      Blog.destroy({
        id: req.params.id
      })
      return res.json(blog)
    } else {
      res.status(404).end()
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})