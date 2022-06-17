/* 
Contains all the user facing routes, 
such as the homepage and login page
*/

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    // Render the main page
    // Homepage shows all the posts, user doesn't need to be logged in for this
    Post.findAll({
        order: [
            ['created_at', 'DESC']
        ],
        attributes: [
            'id', 'title', 'text', 'created_at'
        ],
        include: [{
            model: Comment,
            attributes: [
                'text', 'user_id', 'post_id', 'created_at'
            ],
            // Nested include to replace user_id with username
            include: {
                model: User,
                attributes: ['username']
            }
        }, {
            model: User,
            attributes: ['username']
        }],
    }).then(dbPostData => {
        // Feed this into the handlebars template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/login', (req, res) => {
    console.log('\n=====CHECKING IF LOGGED IN=====\n');
    if (req.session.loggedIn) {
        console.log('\n=====USER IS LOGGED IN ALREADY=====\n');
        res.redirect('/');
        return;
    }
    console.log('\n=====USER IS NOT LOGGED IN, RENDERING LOGIN PAGE=====\n');
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        console.log('\n=====USER IS LOGGED IN ALREADY=====\n');
        res.redirect('/');
        return;
    }
    console.log('\n=====USER IS NOT LOGGED IN, RENDERING SIGNUP PAGE=====\n');
    res.render('signup');
});

// Rendering a single post by id
router.get('/post/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'text',
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            // serialize the data
            const post = dbPostData.get({ plain: true });

            // pass data to template
            res.render('single-post', { post, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;