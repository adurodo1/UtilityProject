const dbConnect=require('../../dbConnect');


async function validateLogin(username,userpassword)
{
 var data;
 return await dbConnect
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('userpassword', userpassword)
    .then((d)=>{
      
        return d;
    })
    .catch((e)=>console.error(e))
   
}

module.exports=validateLogin;