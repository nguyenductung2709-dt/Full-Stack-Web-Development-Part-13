const router = require('express').Router();
const middleware = require('../util/middleware');
const { ReadingList } = require('../models/readinglist');

router.post('/', async(req, res) => {
    try {
        const newList = await ReadingList.create(req.body);
        res.json(newList);
    } catch (err) {
        next(err);
    }
})

router.use(middleware.errorHandler);

module.exports = router;
