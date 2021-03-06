const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', (req, res) => {
    console.log(`====================`);
    Comment.findAll()
        .then(dbCommentData => {
            res.json(dbCommentData)
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// Get individual comment by id
router.get('/:id', (req, res) => {
    console.log(`====================`);
    Comment.findOne({
        where: {
            id: req.query.id
        },
        attributes: [
            'id', 'text', 'post_id', 'user_id'
        ]
    }).then(dbCommentData => {
        res.json(dbCommentData)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// Create new comment
router.post('/', withAuth, (req, res) => {
    // check the session
    if (req.session) {
        Comment.create({
                text: req.body.text,
                post_id: req.body.post_id,
                // use the id from the session
                user_id: req.session.user_id
            })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});


// Update title of post with specific id
router.put('/:id', (req, res) => {

});

// Delete a comment with a specific id
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: "No comment with that ID found." });
            return;
        }
        res.status(200).json({ message: "Comment deleted!" });
    }).catch(err => {
        console.log(err);
        res.json(err);
    })
});

module.exports = router;