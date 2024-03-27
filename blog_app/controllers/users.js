const router = require('express').Router();
const middleware = require('../util/middleware');
const { User, Blog } = require('../models');

router.get('/', async (req, res) => {

    const users = await User.findAll({
      include: {
        model: Blog  // this is used to include Note models correspond to the user
      }
    })
    res.json(users)
})

router.post('/', async(req, res) => {
    try {
        const user = await User.create(req.body)
        res.json(user);
    } catch (err) {
        next(err);
    }
})

router.put('/:username', async(req, res) => {
    try {
        const user = await User.findOne({ where: {username: req.params.username} })
        user.username = req.body.username;
        await user.save();
        res.json(user);
    } catch(err) {
        next(err);
    }
})

router.use(middleware.unknownEndpoint);
router.use(middleware.errorHandler);

module.exports = router;