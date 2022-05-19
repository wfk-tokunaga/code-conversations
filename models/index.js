const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

// Create associations between models
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id'
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

module.exports = { Post, User, Comment }