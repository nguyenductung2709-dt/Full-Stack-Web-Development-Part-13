const router = require('express').Router();
const middleware = require('../util/middleware');
const { Blog, User } = require('../models/index');

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      include: {
        model: User,
        attributes: {
          exclude: ['userId'],
        }
      }
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post('/', middleware.tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const newBlog = await Blog.create({...req.body, userId: user.id, date: new Date()});
    res.json(newBlog);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', middleware.tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    const user = await User.findByPk(req.decodedToken.id)
    console.log(user);
    console.log(blog);
    if (blog && (blog.userId == user.id)) {
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

router.use(middleware.errorHandler);

module.exports = router;
