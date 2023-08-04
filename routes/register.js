const express= require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs')
const router=express.Router();
const dbConnect=require('../dbConnect');
const validatelogin= require('./helpermethods/validatelogin');

router.post('/', async(req,res,next)=>{

//deconstruct username and userpassword from message body
const {username,userpassword} = req.body;
console.log(req.body);

const hashpwd = await bcrypt.hash(userpassword,12)// 12 is the salt to further make encryption random
console.log(hashpwd)
const { error } = await dbConnect
.from('users')
.insert({
    username:username,
    userpassword:hashpwd
  })
console.log(req.user)
res.json(req.user)


});

/*
router.post('/',
passport.authenticate('local', {
    successRedirect: '',
    failureRedirect: '',
  
})
,(req,res,next)=>{

 
console.log(req.user)
res.json(req.user)


});

*/

 

module.exports = router;