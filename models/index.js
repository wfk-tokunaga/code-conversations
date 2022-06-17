const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

// Create associations between models
Post.belongsTo(User, {
    onDelete: 'cascade',
    foreignKey: 'user_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id'
})

Comment.belongsTo(Post, {
    // onDelete: 'cascade',
    foreignKey: 'post_id'
})

Post.hasMany(Comment, {
    onDelete: 'cascade',
    foreignKey: 'post_id'
})

Comment.belongsTo(User, {
    onDelete: 'cascade',
    foreignKey: 'user_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

module.exports = { Post, User, Comment }