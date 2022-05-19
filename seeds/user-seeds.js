const User = require('../models/User');

const userData = [{
        username: 'eika',
        email: 'eika@gmail.com',
        password: 'eikaPW'
    },
    {
        username: 'shae',
        email: 'shae@gmail.com',
        password: 'shaePW'
    },
    {
        username: 'eea',
        email: 'eea@gmail.com',
        password: 'eeaPW'
    },
    {
        username: 'lufa',
        email: 'lufa@gmail.com',
        password: 'lufaPW'
    },
    {
        username: 'mira',
        email: 'mira@gmail.com',
        password: 'miraPW'
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;