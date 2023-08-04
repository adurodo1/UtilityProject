module.exports=function isAuthenticated(req,res,next)
{
    console.log("is called ************")
   
    if(req.isAuthenticated())  
        return next();

        res.redirect('/login');
    
}