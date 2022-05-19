const Comment = require('../models/Comment');

const commentData = [{
        text: 'Great point!',
        post_id: '1',
        user_id: '1'
    },
    {
        text: 'I disagree',
        post_id: '2',
        user_id: '3'
    },
    {
        text: 'I love chemistry so much.',
        post_id: '4',
        user_id: '2'
    },
    {
        text: 'L + ratio',
        post_id: '4',
        user_id: '1'
    },
    {
        text: 'Where is my icescream?',
        post_id: '1',
        user_id: '3'
    },
    {
        text: 'I miss shae :(!',
        post_id: '1',
        user_id: '1'
    },
    {
        text: 'Talk more about how shae is still at home!',
        post_id: '2',
        user_id: '3'
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;