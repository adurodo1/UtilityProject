const express= require('express');
const router= express.Router();
const isAuth= require("../utilities/isAuthenticatec")
router.get('/',isAuth,(req,res,next)=>{

console.log("was called")
    res.send("service1 page")
});

module.exports=router;
 