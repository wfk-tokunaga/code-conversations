const router = require('express').Router();

const apiRoutes = require('./api');
// const postRoutes = require('./post-routes');
// const commentRoutes = require('./comment-routes');

router.use('/api', apiRoutes);
// router.use('/posts', postRoutes);
// router.use('/comments', commentRoutes);

module.exports = router;