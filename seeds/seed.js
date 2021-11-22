const sequelize = require("../config/connection");
const {User,Post,Comment} = require("../models")

const seed = async ()=>{
    const userData = await User.bulkCreate([
        {
            username:"joe",
            password:"password"
        },
        {
            username:"louis",
            password:"password"
        },
        {
            username:"brett",
            password:"password"
        },
        {
            username:"michael",
            password:"password"
        },
    ],{
        individualHooks:true
    })
    const postData = await Post.bulkCreate([
        {
            title: "How to code",
            content: "How the hell am I supposed to know",
            UserId: 1
        },
        {
            title: "How to code",
            content: "How the hell am I supposed to know",
            UserId: 2
        },{
            title: "How to code",
            content: "How the hell am I supposed to know",
            UserId: 3
        },{
            title: "How to code",
            content: "How the hell am I supposed to know",
            UserId: 2
        },{
            title: "How to code",
            content: "How the hell am I supposed to know",
            UserId: 3
        },{
            title: "How to code",
            content: "How the hell am I supposed to know",
            UserId: 1
        },
    ])
    const commentData = await Comment.bulkCreate([
        {
            comment: "This shit wack",
            PostId:2,
            UserId: 1
        },
        {
            comment: "This shit wack",
            PostId:1,
            UserId: 1
        },
        {
            comment: "This shit wack",
            PostId:3,
            UserId: 1
        },
        {
            comment: "This shit wack",
            PostId:2,
            UserId: 2
        }
    ])
}

sequelize.sync({force:true}).then(()=>{
    seed();
})