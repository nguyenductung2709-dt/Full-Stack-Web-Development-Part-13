const router = require('express').Router();
const middleware = require('../util/middleware');
const { Blog } = require('../models/index');

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    console.log(blogs);
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      await blog.destroy();
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      blog.likes += 1;
      await blog.save();
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.use(middleware.unknownEndpoint);
router.use(middleware.errorHandler);

module.exports = router;
