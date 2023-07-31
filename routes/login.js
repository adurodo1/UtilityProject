const express= require('express');
const passport = require('passport');
const router=express.Router();
const validatelogin= require('./helpermethods/validatelogin');

router.post('/',
passport.authenticate('local', {
    successRedirect: '',
    failureRedirect: '',
  
})
,(req,res,next)=>{

/* var username=req.query.username;
var password= req.query.password;

var validationStatus=validatelogin(username,password); */
//console.log("sdfsdfsd")
console.log(req.user)
res.json(req.user)


});

/* route.post('/',(req,res,next)=>{

    var username=req.query.username;
    var password= req.query.password;
    
    var validationStatus=validatelogin(username,password);
    
    
    }); */

module.exports = router;