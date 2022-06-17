const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Get all posts

router.get('/', (req, res) => {
    console.log(`====================`);
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
        }).then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })


});

// Get individual post by ID
router.get('/:id', (req, res) => {
    console.log(`====================`);
    Post.findOne({
            where: {
                id: req.params.id
            },
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
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        }).then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: "No post found with this id" });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// Create a new post
router.post('/', withAuth, (req, res) => {
    console.log(`====================`);
    Post.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.session.user_id,
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update title & text of post with specific id
router.put('/:id', (req, res) => {
    Post.update({
        title: req.body.title,
        text: req.body.text
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with that id." })
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete a post with a specific id
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        // Check if post exists
        if (!dbPostData) {
            res.status(404).json({ message: "Could not find a post with that id." });
            return
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});



module.exports = router;