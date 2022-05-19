const Post = require('../models/Post');

const postData = [{
        title: 'Why Eika is Going to get a Job',
        text: 'Because they are going to keep on trying, of course!',
        user_id: '1'
    },
    {
        title: 'Shae is Home',
        text: 'Shae recently went home for a couple weeks, but they will be back sooner than later!',
        user_id: '3'
    },
    {
        title: 'Coding is Hard',
        text: 'Yeah, we all know. But it can get easier with a good teacher!',
        user_id: '1'
    },
    {
        title: 'Why chocolate is bad',
        text: 'Because it is too rich!',
        user_id: '3'
    },
    {
        title: 'Chemistry is actually the best',
        text: 'Chem is so cool',
        user_id: '2'
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;