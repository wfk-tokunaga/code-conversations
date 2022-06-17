/* 
    All routes for the user's dashboard page.
*/

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
            where: {
                // use the ID from the session
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'text',
                'created_at',
            ],
        })
        .then(dbPostData => {
            // serialize data before passing to template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/add-post', withAuth, (req, res) => {
    res.render('add-post');
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with that ID." });
            return;
        }
        const post = dbPostData.get({ plain: true });
        console.log(post);
        res.render('edit-post', { post, loggedIn: true })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;