const jsonwebtoken = require('jsonwebtoken');
const {secret} = require('../config/jwt');
const User = require('../models/user.tweet');
const color = require('colors');



module.exports = async (req,res,next)=>{
    const auth = req.headers['authorization'];
    try{
      if(auth){
        const jwtToken = auth.split(' ')[1];
  
        console.log(color.yellow('jwtTokenssssss'),jwtToken);
  
        const decodedToken = jsonwebtoken.verify(jwtToken,secret);
  
        console.log("decodedTokensssssss",decodedToken.sub)
  
        const user = await User.findById(decodedToken.sub,'-__v -password',{});
  
        console.log(color.yellow('users'),user);
  
        req.user = user;
    }
    next();
    }catch(err){
      next(err)
    }
    
  }



// module.exports = async (req,res,next)=>{

//   try{
//       const auth = req.headers['authorization'];
  
//       if(auth){
//         const token = auth.split(' ')[1];
      
//         const decodedToken = jsonwebtoken.verify(token,secret);
      
//         const user = await User.findById(decodedToken.sub,'-__v -password',{});
  
//         req.user = user;
//       }
//       next();
//   }catch(e){
//     next(e)
//   }
  
  
  //}