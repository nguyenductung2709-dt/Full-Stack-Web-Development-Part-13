const router = require('express').Router();
const middleware = require('../util/middleware');
const { User, Blog, ReadingList } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog
      }
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: [''] },
      include: [
        {
          model: Blog,
          attributes: { exclude: ['userId'] }
        },
        {
          model: Blog,
          as: 'readings', // Use a different alias for the second inclusion
          attributes: { exclude: ['userId'] },
          through: {
            attributes: { exclude: ['userId', 'blogId', 'createdAt', 'updatedAt'] }
          }
        }
      ]
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async(req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:username', async(req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.username = req.body.username;
    await user.save();
    res.json(user);
  } catch(err) {
    next(err);
  }
});

router.use(middleware.errorHandler);

module.exports = router;
