const Post = require('./Post');
const Comment = require('./Comment');
const User = require('./User');


User.hasMany(Post,{
    onDelete:"CASCADE"
});
Post.belongsTo(User);

User.hasMany(Comment,{
    onDelete:"CASCADE"
});
Comment.belongsTo(User);

Post.hasMany(Comment,{
    onDelete:"CASCADE"
});
Comment.belongsTo(Post);


module.exports={
    Post,
    Comment,
    User
}