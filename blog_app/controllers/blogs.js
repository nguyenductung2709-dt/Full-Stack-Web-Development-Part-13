const router = require('express').Router();

const { Blog } = require('../models/index');

router.get('/', async(req,res) => {
  const blogs = await Blog.findAll()
  console.log(blogs)
  res.json(blogs)
})

router.post('/', async(req,res) => {
  try {
    const newBlog = await Blog.create(req.body)
    return res.json(newBlog)
  }
  catch (err) {
    return res.status(400).json({ err })
  }
})

router.delete('/:id', async(req,res) => {
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

router.put('/:id', async(req,res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    blog.likes = blog.likes + 1
    await blog.save()
    res.json(blog)
  }
  else {
    res.status(404).end()
  }
})

module.exports = router