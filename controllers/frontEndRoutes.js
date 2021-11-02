const express = require('express');
const router = express.Router();
const {Pet,User} = require('../models');

router.get("/",(req,res)=>{
    User.findAll({
    }).then(userData=>{

        const hbsusers = userData.map(user=>user.get({plain:true}))
        // res.json(hbsusers)
        res.render("home",{
            users:hbsusers
        })
    })
})

router.get("/a",(req,res)=>{
    User.findAll({
    }).then(dbUsers=>{
        if(dbUsers.length){
            res.json(dbUsers)
        } else {
            res.status(404).json({message:"No users found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
})


module.exports = router;