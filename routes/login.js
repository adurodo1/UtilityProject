const express= require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs')
const router=express.Router();
const validatelogin= require('./helpermethods/validatelogin');

 
router.post('/',
passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/loginerror',
  
})
,(req,res,next)=>{

 
console.log(req.user)
 


});


router.get('/'
,(req,res,next)=>{

 
res.send("Login Page under construction")
 


});
 

 

module.exports = router;