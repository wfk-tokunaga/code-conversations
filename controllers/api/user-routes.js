const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Get all users
// Prob wanna include their posts
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    }).then(dbUserData => {
        res.status(200).json(dbUserData);
    }).catch(err => {
        res.status(500).json(err);
    })
})

// Get specific user by id
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        // IF SOMETHING COMES UP LATER, THIS MIGHT BE THE ISSUE
        attributes: {
            exclude: ['password']
        },
        include: [{
                model: Post,
                attributes: ['id', 'title', 'text', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found that that ID.' });
            return;
        }
        res.status(200).json(dbUserData);
    }).catch(err => {
        res.status(500).json(err);
    })
})

// Create a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }).then(dbUserData => {
        res.status(200).json({ message: 'User created!' });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// Edit a user
// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete a user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found that that ID.' });
            return;
        }
        res.status(200).json({ message: 'User removed!' });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// router.('/', (req, res) => {

// }).then(dbUserData => {

// }).catch(err => {
//     console.log(err);
//     res.status(500).json(err);
// })

module.exports = router;